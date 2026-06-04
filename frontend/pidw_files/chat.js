// Single-session per browser tab (sessionStorage)
const STORAGE_KEY = 'chat:sessionId:v1';
let sessionId = loadSessionId();
let messages = document.getElementById('chat-messages');
let chatInput = document.getElementById('chat-input');
let history = [];

function openChatPopup() {
    $(".ask-pidw").hide(200);
    $("#chat-popup").removeClass("hidden");
    ensureStartNewVisibility();
    // Load once from Firebase if session exists
    if (loadSessionId()) loadMessagesOnce(history);
    else showWelcomeScreen();

    gsap.fromTo("#chat-popup",
        { scale: 0.94, opacity: 0, y: 22, transformOrigin: "bottom right", filter: 'blur(2px)' },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", clearProps: 'filter', pointerEvents: "auto" }
    );
}

function hideChatPopup() {
    gsap.to("#chat-popup", {
        scale: 0.96,
        opacity: 0,
        y: 12,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
            $("#chat-popup").addClass("hidden");
            $("#close-confirm").addClass("hidden");
            $("#chat-popup").css("pointer-events", "none");
            $(".ask-pidw").show(200);
        }
    });
}

function showConfirmBox() {
    $("#close-confirm").removeClass("hidden");
    var el = $("#close-confirm").children(".confirm-box")[0];
    gsap.fromTo(el,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
    );
}

function closeConfirmBox() {
    $("#close-confirm").addClass("hidden");
}

async function sendMessage(text = chatInput.value.trim()) {
    if (!text) return;

    if (!sessionId) {
        startNewSession();
    }

    // Hide welcome right before the first outgoing message
    hideWelcomeScreen();
    // Manually render user message fast
    appendMessage('user', text, true);
    showLoading();
    chatInput.value = "";

    try {
        const reply = await sendMessageToOpenAI(text);
        hideLoading();

        if (reply) {
            try {
                const content = JSON.parse(reply.content);
                if (content && Array.isArray(content.questions) && content.questions.length > 0) {
                    appendMessage('assistant', content, true, true);
                } else {
                    appendMessage('assistant', content, true);
                }
            } catch {
                appendMessage('assistant', reply.content, true);
            }
        }
    } catch (err) {
        hideLoading();
        appendMessage('assistant', { contentType: 'markdown', content: 'Sorry, I had trouble processing that request. Please try again in a moment.' }, true);
        // Optionally log to console for debugging
        console.error('Chat error:', err);
    }
}

function appendMessage(sender, text, animate = true, followupQuestions = false) {
    const msg = document.createElement("div");
    msg.className = "message " + sender;
    // Assign a unique ID per message and capture raw content for copy/share
    const mid = genId('msg');
    msg.dataset.msgId = mid;
    let rawContent = '';
    let rawContentType = 'markdown';

    if (sender === "assistant") {
        console.log('Assistant message:', text);
        // If backend returns a structured payload { responseType, contentType, content, usedTools }
        if (text && typeof text === 'object' && 'content' in text) {
            rawContentType = (text.contentType || 'markdown').toLowerCase();
            rawContent = typeof text.content === 'string' ? text.content : '';
            if (text.responseType === "speaker" || text.responseType === "person") msg.classList.add('rich');

            const templated = buildTemplateFromStructured(text);

            if (templated) {
                msg.innerHTML = "";
                msg.appendChild(templated);
            } else {
                const contentType = (text.contentType || 'markdown').toLowerCase();
                const content = String(text.content || '');
                if (contentType === 'html') {
                    msg.innerHTML = content; // backend-provided HTML
                } else {
                    msg.innerHTML = marked.parse(content);
                }
            }
        } else {
            // Backward-compatibility: plain text markdown and optional template JSON in message
            const templated = renderAssistantTemplateFromString(text);

            if (templated) {
                msg.innerHTML = "";
                msg.appendChild(templated);
            } else if (isLikelyHTML(text)) {
                msg.innerHTML = text; // server provided raw HTML
            } else if (text.match(/```json([\s\S]*?)```/)) {
                const jsonContent = text.match(/```json([\s\S]*?)```/)[1];
                try {
                    const jsonData = JSON.parse(jsonContent);
                    if (jsonData && jsonData.responseType === "speaker" || jsonData.responseType === "person") {
                        msg.classList.add('chat-person__single');
                    }
                    const templated2 = buildTemplateFromStructured(jsonData);
                    if (templated2) {
                        msg.innerHTML = "";
                        msg.appendChild(templated2);
                    } else { msg.innerHTML = marked.parse(text); }
                } catch {
                    msg.innerHTML = marked.parse(text);
                }
            } else {
                const markedContent = marked.parse(text);
                msg.innerHTML = markedContent;
            }
            if (typeof text === 'string') rawContent = text;
        }
    } else {
        msg.innerText = text;
    }

    $("#chat-messages").append(msg);

    // For assistant messages, add action buttons as a separate row below the message bubble
    if (animate) {
        gsap.from(msg, { y: 10, opacity: 0, duration: 0.18, ease: 'power2.out' });
    }

    setTimeout(() => scrollToBottom(messages), 100);
}

// Detect and render special assistant templates using backend-provided JSON in the message.
// Expected payload example (inside ```json ... ``` code block):
// { "type": "speakers" | "partners" | "schedule", "title": "...", "cta": {"label":"...","url":"..."}, "items": [ ... ] }
function renderAssistantTemplateFromString(text) {
    const payload = extractTemplatePayload(text);
    if (!payload || !payload.responseType) return null;
    const t = String(payload.responseType).toLowerCase();
    if (t === 'speakers') return buildSpeakersTemplate(payload);
    if (t === 'partners' || t === 'sponsors') return buildPartnersTemplate(payload);
    //if (t === 'schedule' || t === 'agenda' || t === 'program') return buildScheduleTemplate(payload);
    return null;
}

// Build a template DOM from a structured backend payload when responseType matches
function buildTemplateFromStructured(payload) {
    if (!payload || !payload.responseType) return null;
    const t = String(payload.responseType).toLowerCase();

    if (t === 'speakers') {
        const { top_text, speakers, bottom_text } = parseSpeakersFromPayload(payload);
        //console.log({ top_text, speakers, bottom_text });
        if (speakers && speakers.length) return buildSpeakersTemplate({ top_text, speakers, bottom_text });
    }
    if (t === 'partners' || t === 'sponsors') {
        const { items, cta } = parsePartnersFromPayload(payload);
        if (items && items.length) return buildPartnersTemplate({ title: 'Partners & Sponsors', cta, items });
    }
    if (t === 'speaker' || t === 'person') {
        //const { person } = parsePersonFromPayload(payload);
        //if (person) return buildPersonTemplate(person);
        return null;
    }

    if (t === 'schedule' || t === 'agenda' || t === 'program') {
        const parsed = parseScheduleMarkdown(payload.content);
        //const { items, cta } = parseScheduleFromPayload(payload);
        if (parsed) return buildScheduleTemplate({ parsed });
    }
    return null;
}

function isLikelyHTML(str) {
    if (typeof str !== 'string') return false;
    const s = str.trim();
    if (!s) return false;
    return s.startsWith('<') && (s.includes('>') || s.includes('</'));
}

function extractTemplatePayload(text) {
    if (!text) return null;
    // Look for fenced JSON block first
    const fenceMatch = text.match(/```json\s*([\s\S]*?)\s*```/i);
    if (fenceMatch) {
        try { return JSON.parse(fenceMatch[1]); } catch { /* ignore */ }
    }
    // Fallback: try to parse whole text if it looks like JSON
    const trimmed = text.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
        try { return JSON.parse(trimmed); } catch { /* ignore */ }
    }
    return null;
}

// ---- Parsers for structured payload content ----
function parseSpeakersFromPayload(payload) {
    const markdown = String(payload.content || '');

    const speakers = [];
    const lines = markdown.split("\n");
    let current = null;

    lines.forEach(line => {
        line = line.trim();

        // Top text
        if (line.startsWith("Here are some")) {
            window.top_text = line;
        }

        // Bottom text
        if (line.startsWith("Need more?")) {
            window.bottom_text = line;
        }

        // New speaker block
        if (/^\d+\.\s\*\*/.test(line)) {
            if (current) speakers.push(current);
            const name = line.match(/\*\*(.*?)\*\*/)[1];
            current = { id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), name };
        }

        // Image
        if (line.startsWith("![")) {
            const img = line.match(/\((.*?)\)/)[1];
            current.image = img;
        }

        // Title
        if (line.startsWith("**Title:**")) {
            current.title = line.replace("**Title:**", "").trim();
        }

        // Role
        if (line.startsWith("**Role:**")) {
            current.role = line.replace("**Role:**", "").trim();
        }

        // Bio
        if (line.startsWith("**Bio:**")) {
            current.bio = line.replace("**Bio:**", "").trim();
        }

        // Topic
        if (line.startsWith("**Topic:**")) {
            current.speech_topic = line.replace("**Topic:**", "").trim();
        }
    });

    if (current) speakers.push(current);

    return {
        top_text: window.top_text || "",
        speakers: speakers,
        bottom_text: window.bottom_text || ""
    };
}

function parsePersonFromPayload(payload) {
    const content = String(payload.content || '');
    const htmlString = marked.parse(content);
    const doc = new DOMParser().parseFromString(htmlString, "text/html");

    // --- Name ---
    const name = doc.querySelector("h1,h2,h3")?.textContent.trim() || "";

    // --- Title & Event Role ---
    let title = "";
    let eventRole = "";
    [...doc.querySelectorAll("p, li")].forEach(el => {
        const text = el.textContent.trim();
        if (/^Title:/i.test(text)) {
            title = text.replace(/^Title:\s*/i, "").trim();
        }
        if (/^Role:/i.test(text)) {
            eventRole = text.replace(/^Role:\s*/i, "").trim();
        }
    });

    // --- Bio ---
    let bio = "";
    const bioBlock = [...doc.querySelectorAll("p")].find(p =>
        /^Bio:/i.test(p.textContent.trim())
    );
    if (bioBlock) {
        // split on <br> so we get the bio text after "Bio:"
        const parts = bioBlock.innerHTML.split(/<br\s*\/?>/i);
        if (parts.length > 1) {
            bio = parts.slice(1).join(" ").replace(/<\/?[^>]+>/g, "").trim();
        }
    }

    // --- Sessions ---
    const sessions = [];
    const sessionHeading = [...doc.querySelectorAll("strong, b")]
        .find(el => /Session/i.test(el.textContent));

    if (sessionHeading) {
        let ul = sessionHeading.parentElement.nextElementSibling;
        while (ul && (ul.tagName === "UL" || ul.tagName === "OL")) {
            [...ul.querySelectorAll("li")].forEach(li => {
                const session = { title: "", day: "", time: "", topic: "" };

                const lines = li.innerHTML
                    .split(/<br\s*\/?>/i)
                    .map(s => s.replace(/<\/?[^>]+>/g, "").trim())
                    .filter(Boolean);

                lines.forEach(line => {
                    if (/^Day:/i.test(line)) session.day = `Day ${line.replace(/^Day:\s*/i, "")}`;
                    else if (/^Time:/i.test(line)) session.time = line.replace(/^Time:\s*/i, "");
                    else if (/^Topic:/i.test(line)) session.topic = line.replace(/^Topic:\s*/i, "");
                    else if (!session.title) session.title = line;
                });

                if (session.day || session.time || session.topic || session.title) {
                    // fallback: if no title, copy topic
                    if (!session.title && session.topic) session.title = session.topic;
                    sessions.push(session);
                }
            });
            ul = ul.nextElementSibling;
        }
    }

    // --- Image ---
    const image = doc.querySelector("img")?.src || "";

    // --- Footer ---
    const footerLink = doc.querySelector("a[href*='speakers']");
    let footer = "";
    if (footerLink) {
        footer = `Need more? View the Speakers — full list (${footerLink.href}).`;
    }

    const final = {
        person: {
            name,
            title,
            eventRole,
            bio: bio.trim(),
            sessions,
            image,
            footer
        }
    };

    console.log(final);
    return final;
}



function parsePartnersFromPayload(payload) {
    const contentType = (payload.contentType || 'markdown').toLowerCase();
    const content = String(payload.content || '');
    const cta = detectCTAFromContent(contentType, content, ['partner', 'sponsor']);
    let items = [];
    if (contentType === 'markdown') {
        const lines = content.split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) {
            const imgMatch = lines[i].match(/!\[([^\]]*)\]\(([^)]+)\)/);
            if (imgMatch) {
                const name = (imgMatch[1] || '').trim();
                const logo = imgMatch[2];
                items.push({ name, logo });
            } else {
                const nameMatch = lines[i].match(/^\s*[-*]\s*\*\*(.+?)\*\*/);
                if (nameMatch) items.push({ name: nameMatch[1].trim() });
            }
        }
        // Merge consecutive name + following image into one item
        items = mergeNameWithFollowingLogo(items);
    } else if (contentType === 'html') {
        const div = document.createElement('div');
        div.innerHTML = content;
        div.querySelectorAll('img').forEach(img => {
            items.push({ name: (img.alt || '').trim(), logo: img.src });
        });
    }
    return { items, cta };
}

function parseScheduleFromPayload(payload) {
    const contentType = (payload.contentType || 'markdown').toLowerCase();
    const content = String(payload.content || '');
    const cta = detectCTAFromContent(contentType, content, ['schedule', 'agenda', 'program']);
    const items = [];
    const push = (time, title) => { if (time || title) items.push({ time: (time || '').trim(), title: (title || '').trim() }); };
    if (contentType === 'markdown') {
        const lines = content.split(/\r?\n/);
        for (const l of lines) {
            let m = l.match(/^\s*[-*]?\s*(\d{1,2}:\d{2}\s*(?:AM|PM)?)\s*(?:[-–—]\s*|\s+)\s*(.+)$/i);
            if (m) { push(m[1], m[2]); continue; }
            m = l.match(/^\s*(\d{1,2}:\d{2})\s*(AM|PM)?,?\s*-\s*(.+)$/i);
            if (m) { push(`${m[1]} ${m[2] || ''}`.trim(), m[3]); }
        }
    } else if (contentType === 'html') {
        const div = document.createElement('div');
        div.innerHTML = content;
        const text = div.textContent || '';
        text.split(/\r?\n/).forEach(l => {
            const m = l.match(/(\d{1,2}:\d{2}\s*(?:AM|PM)?)[^\w]?\s*(.+)/i);
            if (m) push(m[1], m[2]);
        });
    }
    return { items, cta };
}

function parseScheduleMarkdown(markdown) {
    const html = marked.parse(markdown);

    const doc = new DOMParser().parseFromString(html, "text/html");

    const result = { title: "", schedule: [], footer: "" };

    result.title = doc.querySelector('h3').textContent || "Schedule for PIDW25";

    // helper: strip html tags and normalize whitespace
    const strip = s => (s || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

    // helper: extract clean lines from an element splitting on <br> and newline
    function linesFromElement(el) {
        if (!el) return [];
        const html = el.innerHTML || el.textContent || "";
        // split on <br> tags OR literal newlines
        const parts = html.split(/<br\s*\/?>|\r?\n/gi)
            .map(p => strip(p))
            .filter(Boolean);
        return parts;
    }

    // find day headers (h1..h6 that include "Day")
    const dayHeaders = Array.from(doc.querySelectorAll("h1,h2,h3,h4,h5,h6"))
        .filter(h => /Day\s*\d+/i.test(h.textContent));

    // fallback: if no explicit day headers, try to find "#### Day" style in text
    if (dayHeaders.length === 0) {
        const maybe = Array.from(doc.querySelectorAll("h3,h4")).filter(h => /Day\s*\d+/i.test(h.textContent));
        if (maybe.length) dayHeaders.push(...maybe);
    }

    // If still none, but schedule starts with an <ol>, process as a single day block
    if (dayHeaders.length === 0) {
        // create a pseudo-day using first heading or "Schedule"
        const heading = doc.querySelector("h1,h2,h3")?.textContent?.trim() || "Schedule";
        dayHeaders.push(Object.assign(document.createElement("h4"), { textContent: heading }));
        // we won't find the created element in DOM, but we'll locate <ol> globally below
    }

    // iterate each day header and collect the following ordered list (ol)
    for (let i = 0; i < dayHeaders.length; i++) {
        const dayHeader = dayHeaders[i];
        const dayText = strip(dayHeader.textContent);

        // locate the nearest <ol> after this header (stop if next heading encountered)
        let node = dayHeader.nextElementSibling;
        let ol = null;
        while (node) {
            if (/^H[1-6]$/i.test(node.tagName)) break; // stop if another heading found
            if (node.tagName === "OL") { ol = node; break; }
            node = node.nextElementSibling;
        }

        // fallback: if no ol found but there's any ol in document, try the first
        if (!ol) ol = doc.querySelector("ol");

        const dayObj = { day: dayText, events: [] };

        if (ol) {
            const lis = Array.from(ol.children).filter(n => n.tagName === "LI");
            lis.forEach((li, idx) => {
                // gather textual lines from li (ignores nested UL content)
                let lines = linesFromElement(li);
                // also collect nested list speakers if present
                const nestedSpeakers = Array.from(li.querySelectorAll("ul li")).map(s => strip(s.textContent));
                const nstSpeakers = [];
                nestedSpeakers.forEach(speaker => {
                    // convert speaker to slug and remove any words like Mr. Ms. Engr.
                    nstSpeakers.push({
                        name: speaker, image: "https://pidw.pk/assets/images/speakers/" + speaker.toLowerCase().replace(/\b(Mr|Ms|Mrs|Miss|Engr|Dr|Prof|Sir|Madam|barrister)\.?/gi, "") // remove titles
                            .trim()                                 // remove leading/trailing spaces
                            .toLowerCase()                          // lowercase
                            .replace(/[^a-z0-9\s-]/g, "")           // remove special chars
                            .replace(/\s+/g, "-")                   // spaces to dashes
                            .replace(/-+/g, "-") + ".jpg"
                    });

                })
                // fallback: if no lines from linesFromElement (rare), use li.textContent split
                if (lines.length === 0) {
                    lines = li.textContent.split(/\r?\n/).map(s => strip(s)).filter(Boolean);
                }

                // initial session object
                const session = { index: idx + 1, type: "", title: "", panel: "", day: "", time: "", topic: "", speakers: [] };

                // FIRST line usually contains the event title/panel/day-topic inline
                const first = lines[0] || "";

                // detect formats:
                if (/^Panel[:\s]/i.test(first) || /^Panel No/i.test(first)) {
                    // Panel format: "Panel: TITLE" or "**Panel No.2**"
                    session.type = "panel";
                    session.panel = first.replace(/^Panel[:\s]*/i, "").trim();
                    session.title = session.panel;
                } else if (/^Break[:\s]/i.test(first)) {
                    session.type = "break";
                    session.title = first.replace(/^Break[:\s]*/i, "").trim();
                } else if (/Opening\s*/i.test(first) && !/Panel/i.test(first)) {
                    session.type = "opening";
                    session.title = first;
                } else if (/Innovation Case/i.test(first)) {
                    session.type = "innovation";
                    session.title = first;
                } else if (/Keynote|Closing|Speech/i.test(first) && /^Day\s*\d+/i.test(first)) {
                    // special speaker inline like "Day 1: Opening Speech #1"
                    session.type = "special";
                    const m = first.match(/^(Day\s*\d+)\s*:\s*(.+)$/i);
                    if (m) {
                        session.day = m[1].trim();
                        session.topic = m[2].trim();
                        session.title = session.topic;
                    } else {
                        session.title = first;
                    }
                } else if (/^Day\s*\d+/i.test(first)) {
                    // another special pattern
                    session.type = "special";
                    const m = first.match(/^(Day\s*\d+)\s*[:\-]\s*(.+)$/i);
                    if (m) {
                        session.day = m[1].trim();
                        session.topic = m[2].trim();
                        session.title = session.topic;
                    } else {
                        session.title = first;
                    }
                } else {
                    // default: treat as general title
                    session.type = "general";
                    session.title = first;
                }

                // parse subsequent lines for Time / Topic / Day / Speakers markers
                for (let j = 1; j < lines.length; j++) {
                    const ln = lines[j];
                    if (/^Time\s*[:\-]/i.test(ln) || /(^\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2})/.test(ln)) {
                        // "Time: 09:40 - 10:00" or just "09:40 - 10:00"
                        const timeMatch = ln.match(/Time\s*[:\-]\s*(.+)/i);
                        session.time = timeMatch ? timeMatch[1].trim() : ln.trim();
                        continue;
                    }
                    if (/^Topic\s*[:\-]/i.test(ln)) {
                        session.topic = ln.replace(/^Topic\s*[:\-]\s*/i, "").trim();
                        continue;
                    }
                    if (/^Day\s*[:\-]/i.test(ln)) {
                        session.day = ln.replace(/^Day\s*[:\-]\s*/i, "").trim();
                        continue;
                    }
                    if (/^Speakers?\s*[:\-]/i.test(ln)) {
                        // speakers may be in nested UL (preferred) — handled below
                        continue;
                    }
                    // fallback: if no labeled Time but line looks like time range
                    const timeRange = ln.match(/^\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}$/);
                    if (timeRange) session.time = timeRange[0];
                }

                // set speakers from nested list if present
                if (nstSpeakers.length) {
                    session.speakers = nstSpeakers;
                } else {
                    // fallback: lines may contain speakers inline after "Speakers:" label
                    const spIndex = lines.findIndex(l => /^Speakers?\s*:/.test(l));
                    if (spIndex >= 0) {
                        // subsequent lines might be names, or the same line after colon
                        const inline = lines.slice(spIndex + 1).map(s => s.replace(/^-\s*/, "").trim()).filter(Boolean);
                        if (inline.length) session.speakers = inline;
                        else {
                            // try splitting the part after "Speakers:" by comma or " - "
                            const after = lines[spIndex].split(/Speakers?\s*:\s*/i)[1] || "";
                            const arr = after.split(/[,•;]\s*| - /).map(s => s.trim()).filter(Boolean);
                            if (arr.length) session.speakers = arr;
                        }
                    }
                }

                // if session.day empty, inherit from day header (e.g., "Day 1: October 11, 2025")
                if (!session.day && /Day\s*\d+/i.test(dayText)) {
                    const mday = dayText.match(/Day\s*\d+(:\s*.+)?/i);
                    session.day = mday ? (mday[0].trim()) : dayText;
                }

                // ensure keys exist
                session.panel = session.panel || "";
                session.day = session.day || "";
                session.time = session.time || "";
                session.topic = session.topic || "";
                session.speakers = session.speakers || [];
                session.title = session.title || "";

                dayObj.events.push(session);
            }); // end lis.forEach
        } // end if(ol)

        result.schedule.push(dayObj);
    } // end for each dayHeader

    // FOOTER: find paragraph containing "Need more" or link to schedule
    const footerParagraph = Array.from(doc.querySelectorAll("p")).find(p => /Need more|full list|schedule/i.test(p.textContent));
    if (footerParagraph) result.footer = footerParagraph.innerHTML.trim();

    return result;
}

function mergeNameWithFollowingLogo(items) {
    const merged = [];
    for (let i = 0; i < items.length; i++) {
        const it = items[i];
        if (it.name && !it.logo && i + 1 < items.length && items[i + 1].logo && !items[i + 1].name) {
            merged.push({ name: it.name, logo: items[i + 1].logo });
            i++; // skip next
        } else {
            merged.push(it);
        }
    }
    return merged;
}

function detectCTAFromContent(contentType, content, keywords) {
    keywords = keywords || [];
    if (contentType === 'markdown') {
        const re = /\[([^\]]+)\]\((https?:[^)]+)\)/g;
        let match, last = null;
        while ((match = re.exec(content))) {
            const label = match[1];
            const url = match[2];
            if (!keywords.length || keywords.some(k => label.toLowerCase().includes(k))) last = { label, url };
            else last = { label, url };
        }
        return last;
    } else if (contentType === 'html') {
        const div = document.createElement('div');
        div.innerHTML = content;
        const links = div.querySelectorAll('a[href]');
        if (links.length) {
            const a = links[links.length - 1];
            return { label: (a.textContent || 'View').trim(), url: a.href };
        }
    }
    return undefined;
}

function buildHeaderRow(title, cta = null) {
    const header = document.createElement('p');
    header.style.paddingBottom = '8px';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.innerHTML = marked.parseInline('**' + (title || '') + '**');
    if (cta && cta.url) {
        const a = document.createElement('a');
        a.className = 'tmpl-link';
        a.href = cta.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.innerHTML = cta.label === 'PIDW25 Speakers' ? 'View PIDW25 Speakers <i class="fa fa-link-external"></i>' : (cta.label || 'View');
        header.appendChild(a);
    }
    return header;
}

function buildSpeakersTemplate(payload) {
    const wrap = document.createElement('div');
    wrap.className = 'rich';
    wrap.appendChild(buildHeaderRow(payload.title || 'Speakers', payload.cta));
    if (payload.top_text) {
        const top = document.createElement('div');
        top.className = 'chat-speakers__toptext';
        top.innerHTML = marked.parse(String(payload.top_text));
        wrap.appendChild(top);
    }

    const grid = document.createElement('div');
    grid.className = 'speakers-items__list w-dyn-items';
    grid.setAttribute('role', 'list');
    const items = Array.isArray(payload.speakers) ? payload.speakers : [];
    items.forEach(p => {
        if (!p.id) p.id = genId('spk');
        const card = document.createElement('div');
        card.className = 'person-card';
        card.setAttribute('data-modal-card-id', p.id);
        card.setAttribute('data-modal-card-click', '');
        card.setAttribute('data-hover', '');
        card.setAttribute('style', 'align-items: center; justify-content: center; width: calc((99.99% / 2) - (var(--gap) * ((2 - 1) / 2)));');
        const thumb = document.createElement('div'); thumb.className = 'person-card__image';
        const imgBefore = document.createElement('div'); imgBefore.className = 'person-card__image-before'; thumb.appendChild(imgBefore);
        const cardHoverCorners = document.createElement('div'); cardHoverCorners.className = 'card-hover-corners'; thumb.appendChild(cardHoverCorners);
        const corner = document.createElement('div'); corner.className = 'card-hover-corners__corner';
        const cornerRight = document.createElement('div'); cornerRight.className = 'card-hover-corners__corner is--right';
        const cornerBottomLeft = document.createElement('div'); cornerBottomLeft.className = 'card-hover-corners__corner is--bottom-left';
        const cornerBottomRight = document.createElement('div'); cornerBottomRight.className = 'card-hover-corners__corner is--bottom-right';
        const cornerInner = document.createElement('div'); cornerInner.className = 'card-hover-corners__corner-inner';
        corner.appendChild(cornerInner);
        cornerRight.appendChild(cornerInner.cloneNode(true));
        cornerBottomLeft.appendChild(cornerInner.cloneNode(true));
        cornerBottomRight.appendChild(cornerInner.cloneNode(true));
        cardHoverCorners.appendChild(cornerRight);
        cardHoverCorners.appendChild(cornerBottomLeft);
        cardHoverCorners.appendChild(cornerBottomRight);
        cardHoverCorners.appendChild(corner);

        if (p.image) {
            const img = document.createElement('img');
            img.classList.add('person-card__image-img');
            img.src = p.image;
            img.alt = p.name || 'Speaker';
            img.loading = 'lazy';
            thumb.appendChild(img);
        }
        const cardInfo = document.createElement('div');
        cardInfo.className = 'person-card__info';
        // layout for inline avatar + text
        cardInfo.style.display = 'flex';
        cardInfo.style.alignItems = 'center';
        cardInfo.style.gap = '10px';
        card.style.flexDirection = 'column';
        card.style.alignItems = 'flex-start';

        // Text block (name + role/title)
        const textWrap = document.createElement('div');
        textWrap.style.display = 'flex';
        textWrap.style.flexDirection = 'column';
        textWrap.style.gap = '2px';

        const name = document.createElement('div');
        name.classList.add('h5', 'person-card__h5');
        name.textContent = p.name || '';
        name.style.fontSize = '1em';
        name.style.fontWeight = '500';

        const subline = document.createElement('div');
        subline.className = 'person-card__job-title';
        // Prefer role under the name; fall back to title
        subline.textContent = p.title || p.role || '';

        textWrap.appendChild(name);
        textWrap.appendChild(subline);
        cardInfo.appendChild(textWrap);
        card.appendChild(thumb);
        card.appendChild(cardInfo);
        grid.appendChild(card);
    });
    wrap.appendChild(grid);

    // Modal container with per-speaker modal cards
    const list = document.getElementById('chat-modal-list');

    items.forEach(p => {
        const mcard = document.createElement('div');
        mcard.className = 'modal-card is--person w-dyn-item';
        mcard.setAttribute('role', 'listitem');
        mcard.setAttribute('data-modal-card-status', 'not-active');
        mcard.setAttribute('data-modal-card-id', p.id);
        const scroll = document.createElement('div'); scroll.className = 'modal-tickets__scroll'; scroll.setAttribute('data-lenis-prevent', '');
        const person = document.createElement('div'); person.className = 'modal-card-person';

        const start = document.createElement('div'); start.className = 'modal-card-person__start';
        const logoWrap = document.createElement('div'); logoWrap.className = 'modal-card-person__logo';
        const logoImg = document.createElement('img'); logoImg.src = '/assets/images/svg/icons/speaker.svg'; logoImg.loading = 'lazy'; logoImg.alt = ''; logoImg.className = 'modal-card-person__logo-img';
        logoWrap.appendChild(logoImg); start.appendChild(logoWrap);

        const end = document.createElement('div'); end.className = 'modal-card-person__end';
        const tagWrap = document.createElement('div'); tagWrap.className = 'modal-card-person__tag';
        const tag = document.createElement('div'); tag.className = 'tag';
        const tagP = document.createElement('p'); tagP.className = 'tag__p'; tagP.textContent = p.role || 'Speaker';
        tag.appendChild(tagP); tagWrap.appendChild(tag);

        const info = document.createElement('div'); info.className = 'modal-card-person__info';
        const h3 = document.createElement('h3'); h3.className = 'h3'; h3.textContent = p.name || '';
        const job = document.createElement('p'); job.className = 'modal-card-person__job-title'; job.textContent = p.title || '';
        info.appendChild(h3); info.appendChild(job);

        const bio = document.createElement('div'); bio.className = 'modal-card-person__bio';
        const panelDetails = document.createElement('div');
        if (p.speech_topic || p.speech_day || p.speech_time || p.speach_topic || p.speach_day)
            panelDetails.innerHTML = `<p><strong>Panel Topic:</strong> ${p.speech_topic || p.speach_topic || 'N/A'}</p><p><strong>Date & Time:</strong> 1${p.speech_day || p.speach_day}, October 2025 at ${p.speech_time || 'TBA'}</p>`;

        bio.innerHTML = `<p style="padding-top: .8em">${p.bio}</p>`;

        end.appendChild(tagWrap);
        end.appendChild(info);
        end.appendChild(bio);
        end.appendChild(panelDetails);

        person.appendChild(start);
        person.appendChild(end);
        scroll.appendChild(person);
        mcard.appendChild(scroll);
        list.appendChild(mcard);
    });

    if (payload.bottom_text) {
        const bottom = document.createElement('div');
        bottom.className = 'chat-speakers__bottomtext';
        bottom.innerHTML = marked.parse(String(payload.bottom_text));
        wrap.appendChild(bottom);
    }

    return wrap;
}


function buildPersonTemplate(payload) {
    const p = payload || {};
    const sessions = Array.isArray(p.sessions) ? p.sessions : [];

    // helpers
    const lc = (s) => String(s || '').toLowerCase();
    const formatDayText = (d) => {
        const m = String(d || '').match(/^\s*(?:day\s*)?(\d+)\s*:\s*(.+)$/i);
        if (m) return `Day ${m[1]} — ${m[2]}`;
        const m2 = String(d || '').match(/^\s*day\s*\d+/i);
        return m2 ? d : String(d || '');
    };
    const detectRoleFromSessions = () => {
        const txt = [
            p.eventRole,
            ...(sessions.map(s => `${s.day || ''} ${s.topic || ''}`))
        ].join(' ').toLowerCase();
        if (txt.includes('opening')) return 'Opening Speaker';
        if (txt.includes('keynote')) return 'Keynote Speaker';
        if (txt.includes('moderator')) return 'Moderator';
        return null;
    };
    const addDetailToList = (list, label, value) => {
        if (!value) return;
        const li = document.createElement('li');
        li.innerHTML = `<strong>${label}:</strong> ${value}`;
        list.appendChild(li);
    };

    // container
    const person = document.createElement('div');
    person.className = 'rich';

    // header
    const header = document.createElement('div');
    header.className = 'chat-person__header';

    if (p.image) {
        const img = document.createElement('img');
        img.src = p.image;
        img.alt = p.name || 'Person';
        img.loading = 'lazy';
        header.appendChild(img);
    }

    const intro = document.createElement('div');
    intro.className = 'person-intro';

    const name = document.createElement('h4');
    name.className = 'chat-person__name';
    name.textContent = p.name || '';
    intro.appendChild(name);

    const rolesArr = Array.isArray(p.roles) ? p.roles
        : (Array.isArray(p.designations) ? p.designations : []);
    const roleLine = [p.eventRole, ...rolesArr].filter(Boolean).join(', ');
    if (roleLine) {
        const roleEl = document.createElement('p');
        roleEl.className = 'chat-person__title';
        roleEl.textContent = roleLine;
        intro.appendChild(roleEl);
    }

    if (p.bio) {
        const summary = document.createElement('div');
        summary.className = 'chat-person__summary';
        summary.innerHTML = marked.parse(String(p.bio));
        intro.appendChild(summary);
    }

    header.appendChild(intro);

    // details
    const details = document.createElement('div');
    details.className = 'chat-person__details';

    const detected = detectRoleFromSessions();
    const isOpening = detected === 'Opening Speaker';
    const isKeynote = detected === 'Keynote Speaker';
    const isModerator = detected === 'Moderator';

    const detailsTitle = document.createElement('h4');
    detailsTitle.className = 'chat-person__details-title';
    detailsTitle.textContent = detected || 'Schedule & Topics';
    details.appendChild(detailsTitle);

    if (sessions.length) {
        sessions.forEach((s, idx) => {
            // Day
            if (s.day) {
                const dayP = document.createElement('p');
                dayP.className = 'chat-person__details-day';
                dayP.textContent = formatDayText(s.day);
                details.appendChild(dayP);
            }
            // Time
            if (s.time) {
                const timeP = document.createElement('p');
                timeP.className = 'chat-person__details-time';
                timeP.textContent = s.time;
                details.appendChild(timeP);
            }
            // Panel/Topic list
            const list = document.createElement('ul');
            list.className = 'chat-person__details-list';
            // For Opening/Keynote, panel might be empty or irrelevant — still show if present
            addDetailToList(list, 'Panel', s.panel);
            addDetailToList(list, 'Topic', s.topic);
            if (list.children.length) details.appendChild(list);

            // spacer between sessions
            if (idx < sessions.length - 1) {
                const sep = document.createElement('div');
                sep.style.height = '10px';
                details.appendChild(sep);
            }
        });
    } else {
        // Backward compatibility: single fields (speech_day, speech_time, panel, speech_topic)
        if (p.speech_day) {
            const dayP = document.createElement('p');
            dayP.className = 'chat-person__details-day';
            dayP.textContent = `Day ${p.speech_day}`;
            details.appendChild(dayP);
        }
        if (p.speech_time) {
            const timeP = document.createElement('p');
            timeP.className = 'chat-person__details-time';
            timeP.textContent = p.speech_time;
            details.appendChild(timeP);
        }
        const list = document.createElement('ul');
        list.className = 'chat-person__details-list';
        // Show panel unless explicitly an Opening/Keynote session
        if (!isOpening && !isKeynote) addDetailToList(list, 'Panel', p.panel);
        addDetailToList(list, 'Topic', p.speech_topic);
        if (list.children.length) details.appendChild(list);
    }

    if (p.footer) {
        const footer = document.createElement('div');
        footer.className = 'chat-person__footer';
        footer.innerHTML = marked.parse(String(p.footer));
        details.appendChild(footer);
    }

    person.appendChild(header);
    person.appendChild(details);

    return person;
}

function buildPartnersTemplate(payload) {
    const wrap = document.createElement('div'); wrap.className = 'tmpl-wrap';
    wrap.appendChild(buildHeaderRow(payload.title || 'Partners & Sponsors', payload.cta));
    const grid = document.createElement('div'); grid.className = 'tmpl-grid partners';
    const items = Array.isArray(payload.items) ? payload.items : [];
    items.forEach(p => {
        const card = document.createElement('div'); card.className = 'card partner';
        const thumb = document.createElement('div'); thumb.className = 'thumb logo';
        if (p.logo) { const img = document.createElement('img'); img.src = p.logo; img.alt = p.name || 'Partner'; img.loading = 'lazy'; thumb.appendChild(img); }
        card.appendChild(thumb);
        if (p.name) { const meta = document.createElement('div'); meta.className = 'meta'; const ttl = document.createElement('div'); ttl.className = 'title'; ttl.textContent = p.name; meta.appendChild(ttl); card.appendChild(meta); }
        if (p.url) { const link = document.createElement('a'); link.href = p.url; link.className = 'tmpl-link'; link.textContent = p.cta || 'Visit'; card.appendChild(link); }
        grid.appendChild(card);
    });
    wrap.appendChild(grid);
    return wrap;
}

function buildScheduleTemplate(payload) {
    // Normalize payload shape and provide safe defaults
    payload = (payload && payload.parsed) ? payload.parsed : (payload || {});

    const wrap = document.createElement('div');
    wrap.className = 'rich';
    const header = document.createElement('p');
    header.style.paddingBottom = '8px';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.innerHTML = String(payload.title || 'Schedule');

    wrap.appendChild(header);

    const days = Array.isArray(payload.schedule) ? payload.schedule : [];
    const dayWrap = document.createElement('div');
    dayWrap.className = 'schedule-day';

    days.forEach(day => {
        // Day title
        const dayTitle = document.createElement('h4');
        dayTitle.className = 'h4';
        dayTitle.textContent = String((day && day.day) || '');
        dayWrap.appendChild(dayTitle);

        // Events
        (day && Array.isArray(day.events) ? day.events : (day.events || [])).forEach((event, evIdx) => {
            const evWrap = document.createElement('div');
            evWrap.className = 'schedule-event';
            evWrap.style.marginBottom = '2em';

            // Store meta for async enrichment
            evWrap.dataset.day = String(day && day.day || '');
            evWrap.dataset.panel = String(event && event.panel || '');
            try { evWrap.dataset.speakers = JSON.stringify(Array.isArray(event.speakers) ? event.speakers : []); } catch { evWrap.dataset.speakers = '[]'; }

            // Time
            const time = document.createElement('div');
            time.className = 'schedule-time';
            time.textContent = event.time || '';
            time.style.fontWeight = '600';
            evWrap.appendChild(time);

            // Title
            const title = document.createElement('h3');
            title.className = 'h5';
            title.textContent = event.title || '';
            title.style.margin = '0.2em 0';
            evWrap.appendChild(title);

            // Topic
            if (event.topic) {
                const topic = document.createElement('div');
                topic.className = 'schedule-topic';
                topic.innerHTML = `<strong>Topic:</strong> ${event.topic}`;
                topic.style.marginBottom = '0.3em';
                evWrap.appendChild(topic);
            }

            // Panel
            if (event.panel) {
                //const panel = document.createElement('div');
                //panel.className = 'schedule-panel';
                //panel.innerHTML = `<strong>Panel:</strong> ${event.panel}`;
                //evWrap.appendChild(panel);
            }

            // Speakers & Moderators (initial render with available info)
            const speakers = Array.isArray(event.speakers) ? event.speakers : [];
            const grid = document.createElement('div');
            grid.className = 'schedule-speakers-grid';
            grid.style.display = 'flex';
            grid.style.flexWrap = 'wrap';
            grid.style.gap = '20px';
            grid.style.marginTop = '1em';

            speakers.forEach(item => {
                const s = (item && typeof item === 'object') ? { ...item } : { name: String(item || '') };
                if (!s.id) s.id = genId('schedspk');
                const norm = normalizeName(s.name || '');

                const card = document.createElement('div');
                card.className = 'person-card';
                card.setAttribute('data-modal-card-id', s.id);
                card.setAttribute('data-modal-card-click', '');
                card.dataset.speakerName = norm;

                // Moderator full width if role hints at moderator
                const isModerator = !!(s.role && String(s.role).toLowerCase().includes('moderator'));
                card.style.width = isModerator
                    ? '100%'
                    : 'calc((99.99% / 2) - (var(--gap) * ((2 - 1) / 2)))';

                // Image
                const thumb = document.createElement('div');
                thumb.className = 'person-card__image';
                if (s.image) {
                    const img = document.createElement('img');
                    img.classList.add('person-card__image-img');
                    img.src = s.image;
                    img.alt = s.name || 'Speaker';
                    img.loading = 'lazy';
                    img.style.position = "unset";
                    thumb.appendChild(img);
                }
                card.appendChild(thumb);

                // Info
                const cardInfo = document.createElement('div');
                cardInfo.className = 'person-card__info';
                const name = document.createElement('div');
                name.classList.add('h5', 'person-card__h5');
                name.textContent = s.name || '';
                const subline = document.createElement('div');
                subline.className = 'person-card__job-title';
                subline.textContent = s.role || '';
                cardInfo.appendChild(name);
                cardInfo.appendChild(subline);
                card.appendChild(cardInfo);

                grid.appendChild(card);
            });

            evWrap.appendChild(grid);
            dayWrap.appendChild(evWrap);
        });

    });

    wrap.appendChild(dayWrap);

    if (payload.footer) {
        const footer = document.createElement('div');
        footer.className = 'schedule-footer';
        footer.innerHTML = marked.parse(String(payload.footer));
        wrap.appendChild(footer);
    }

    // Async enrichment with pidw_speakers.json (image, name, role, panel, and missing moderators)
    setTimeout(() => enrichScheduleWithSpeakers(dayWrap).catch(console.error), 0);

    return wrap;
}

/* ---------- Speakers enrichment (pidw_speakers.json) ---------- */

const SPEAKERS_JSON_CANDIDATES = [
    '/assets/js/pidw_speakers.json'
];
let SPEAKERS_INDEX_CACHE = null;

async function enrichScheduleWithSpeakers(rootEl) {
    const index = await loadSpeakersIndex();
    const events = rootEl.querySelectorAll('.schedule-event');

    events.forEach(ev => {
        const grid = ev.querySelector('.schedule-speakers-grid');
        if (!grid) return;

        const panelName =
            ev.dataset.panel ||
            (ev.querySelector('.schedule-panel')?.textContent.replace(/^Panel:\s*/i, '').trim() || '');

        // 1) Update all existing cards using JSON data (always override image with JSON URL)
        grid.querySelectorAll('.person-card').forEach(card => {
            const nameEl = card.querySelector('.person-card__h5');
            const displayName = (nameEl?.textContent || '').trim();
            if (!displayName) return;

            const match = findSpeakerByNameLike(displayName, index);
            if (!match) return;

            // Set normalized name for lookup
            card.dataset.speakerName = normalizeName(match.name || displayName);

            // Always override image with JSON image URL
            const thumb = card.querySelector('.person-card__image');
            const imgUrl = match.image || match.photo || match.img || '';
            if (imgUrl) setOrReplaceImg(thumb, imgUrl, match.name || displayName);

            // Update name and role/title
            if (nameEl) nameEl.textContent = match.name || displayName;
            const sub = card.querySelector('.person-card__job-title');
            const role = match.role || match.title || '';
            if (sub) sub.textContent = role;

            // Moderator full width
            const isModerator = String(role).toLowerCase().includes('moderator');
            card.style.width = isModerator
                ? '100%'
                : 'calc((99.99% / 2) - (var(--gap) * ((2 - 1) / 2)))';
        });

        // 2) Add missing moderators for this panel from JSON
        if (panelName) {
            const moderators = findModeratorsByPanel(panelName, index);
            moderators.forEach(mod => {
                const norm = normalizeName(mod.name || '');
                if (grid.querySelector(`.person-card[data-speaker-name="${norm}"]`)) return;

                const card = document.createElement('div');
                card.className = 'person-card';
                card.setAttribute('data-modal-card-id', genId('schedspk'));
                card.setAttribute('data-modal-card-click', '');
                card.dataset.speakerName = norm;
                card.style.width = '100%'; // moderator full width

                const thumb = document.createElement('div');
                thumb.className = 'person-card__image';
                const imgUrl = mod.image || mod.photo || mod.img || '';
                if (imgUrl) setOrReplaceImg(thumb, imgUrl, mod.name || 'Moderator');
                card.appendChild(thumb);

                const info = document.createElement('div');
                info.className = 'person-card__info';
                const name = document.createElement('div');
                name.classList.add('h5', 'person-card__h5');
                name.textContent = mod.name || '';
                const subline = document.createElement('div');
                subline.className = 'person-card__job-title';
                subline.textContent = mod.role || mod.title || 'Moderator';
                info.appendChild(name);
                info.appendChild(subline);
                card.appendChild(info);

                grid.appendChild(card);
            });
        }
    });

    function setOrReplaceImg(thumb, url, alt) {
        if (!thumb || !url) return;
        let img = thumb.querySelector('img.person-card__image-img');
        if (!img) {
            img = document.createElement('img');
            img.classList.add('person-card__image-img');
            img.loading = 'lazy';
            thumb.appendChild(img);
        }
        img.src = url; // Always override with JSON image URL
        img.alt = alt || img.alt || 'Speaker';
    }
}

async function loadSpeakersIndex() {
    if (SPEAKERS_INDEX_CACHE) return SPEAKERS_INDEX_CACHE;
    let data = null;
    for (const url of SPEAKERS_JSON_CANDIDATES) {
        try {
            const res = await fetch(url, { cache: 'no-store' });
            if (res.ok) { data = await res.json(); break; }
        } catch { /* try next */ }
    }
    if (!Array.isArray(data)) data = (data && Array.isArray(data.speakers)) ? data.speakers : (data ? Object.values(data) : []);
    SPEAKERS_INDEX_CACHE = buildSpeakersIndex(Array.isArray(data) ? data : []);
    return SPEAKERS_INDEX_CACHE;
}

function buildSpeakersIndex(list) {
    const byName = new Map();
    const byPanel = new Map();

    (list || []).forEach(raw => {
        const s = normalizeSpeakerRecord(raw);
        const key = normalizeName(s.name || '');
        if (key) byName.set(key, s);

        const panelKey = normalizePanel(s.panel || s.panel_topic || s.session || s.topic || '');
        if (panelKey) {
            if (!byPanel.has(panelKey)) byPanel.set(panelKey, []);
            byPanel.get(panelKey).push(s);
        }
    });

    return { byName, byPanel };
}

function normalizeSpeakerRecord(s) {
    // Accept various field names from JSON
    const name = s.name || s.full_name || s.display_name || '';
    const role = s.role || s.title || s.position || '';
    const panel = s.panel || s.panel_topic || s.session || s.topic || '';
    const image = s.image || s.photo || s.avatar || s.img || '';
    return { ...s, name, role, panel, image };
}

function normalizeName(n) {
    return String(n || '')
        .toLowerCase()
        // remove honorifics/titles
        .replace(/\b(mr|ms|mrs|miss|engr|dr|prof|sir|madam|barrister|adv|advocate|justice|hon|honourable|honorable)\.?/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function normalizePanel(p) {
    return String(p || '')
        .toLowerCase()
        .replace(/<[^>]*>/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function findSpeakerByNameLike(name, index) {
    if (!name) return null;
    const n = normalizeName(name);
    if (index.byName.has(n)) return index.byName.get(n);

    // Fuzzy search by token overlap
    const tokens = n.split(' ').filter(Boolean);
    let best = null, bestScore = 0;
    for (const [k, person] of index.byName.entries()) {
        const ks = new Set(k.split(' ').filter(Boolean));
        let score = 0;
        tokens.forEach(t => { if (ks.has(t)) score++; });
        // prefer matches that include surname
        if (tokens.length && ks.has(tokens[tokens.length - 1])) score += 0.5;
        if (score > bestScore) { bestScore = score; best = person; }
    }
    return bestScore >= 1 ? best : null;
}

function findModeratorsByPanel(panel, index) {
    const key = normalizePanel(panel);
    const arr = index.byPanel.get(key) || [];
    return arr.filter(p => String(p.role || '').toLowerCase().includes('moderator'));
}


async function parseJSONSchedule(data) {
    try {
        // Accept string or object
        const payload = typeof data === 'string' ? JSON.parse(data) : data || {};

        // New payload is an array of sessions
        const sessions = Array.isArray(payload)
            ? payload
            : (Array.isArray(payload.schedule) ? payload.schedule : []);

        if (!Array.isArray(sessions) || sessions.length === 0) {
            appendMessage('assistant', { contentType: 'markdown', content: 'No schedule data found.' }, true);
            return;
        }

        hideWelcomeScreen?.();

        // Group by day (number)
        const daysMap = new Map();
        sessions.forEach(s => {
            const dayNum = s.day || s['speach-day'] || 1;
            if (!daysMap.has(dayNum)) daysMap.set(dayNum, []);
            daysMap.get(dayNum).push(s);
        });

        // Build DOM (no external enrichment)
        const wrap = document.createElement('div');
        wrap.className = 'rich';

        // Header
        const header = document.createElement('p');
        header.style.paddingBottom = '8px';
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.innerHTML = 'Schedule';
        wrap.appendChild(header);

        const dayWrap = document.createElement('div');
        dayWrap.className = 'schedule-day';

        // Sort days ascending
        Array.from(daysMap.keys()).sort((a, b) => a - b).forEach(dayNum => {
            const dayTitle = document.createElement('h4');
            dayTitle.className = 'h4';
            dayTitle.textContent = `Day ${dayNum}`;
            dayWrap.appendChild(dayTitle);

            // Sort sessions by "from" time if present
            const daySessions = (daysMap.get(dayNum) || []).slice().sort((a, b) => {
                const ta = (a.from || '').padStart(5, '0');
                const tb = (b.from || '').padStart(5, '0');
                return ta.localeCompare(tb);
            });

            daySessions.forEach((raw, idx) => {
                const ev = normalizeEvent(raw);

                const evWrap = document.createElement('div');
                evWrap.className = 'schedule-event';
                evWrap.style.marginBottom = '2em';

                evWrap.dataset.day = `Day ${dayNum}`;
                evWrap.dataset.panel = String(ev.panel || '');
                try { evWrap.dataset.speakers = JSON.stringify(ev.speakers || []); } catch { evWrap.dataset.speakers = '[]'; }

                // Time
                const time = document.createElement('div');
                time.className = 'schedule-time';
                time.textContent = ev.time || '';
                time.style.fontWeight = '600';
                evWrap.appendChild(time);

                // Title
                const title = document.createElement('h3');
                title.className = 'h5';
                title.textContent = ev.title || '';
                title.style.margin = '0.2em 0';
                evWrap.appendChild(title);

                // Topic (optional)
                if (ev.topic) {
                    const topic = document.createElement('div');
                    topic.className = 'schedule-topic';
                    topic.innerHTML = `<strong>Topic:</strong> ${ev.topic}`;
                    topic.style.marginBottom = '0.3em';
                    evWrap.appendChild(topic);
                }

                // Speakers grid (skip for Breaks)
                if (!/break/i.test(ev.type)) {
                    const grid = document.createElement('div');
                    grid.className = 'schedule-speakers-grid';
                    grid.style.display = 'flex';
                    grid.style.flexWrap = 'wrap';
                    grid.style.gap = '20px';
                    grid.style.marginTop = '1em';

                    (ev.speakers || []).forEach(sp => {
                        const s = normalizeSpeaker(sp);

                        const card = document.createElement('div');
                        card.className = 'person-card';
                        card.setAttribute('data-modal-card-id', s.id || genId('schedspk'));
                        card.setAttribute('data-modal-card-click', '');

                        const isModerator = String(s.role || '').toLowerCase().includes('moderator');
                        card.style.width = isModerator
                            ? '100%'
                            : 'calc((99.99% / 2) - (var(--gap) * ((2 - 1) / 2)))';

                        // Image
                        const thumb = document.createElement('div');
                        thumb.className = 'person-card__image';
                        if (s.image) {
                            const img = document.createElement('img');
                            img.classList.add('person-card__image-img');
                            img.src = s.image;
                            img.alt = s.name || 'Speaker';
                            img.loading = 'lazy';
                            img.style.position = "unset";
                            thumb.appendChild(img);
                        }
                        card.appendChild(thumb);

                        // Info
                        const info = document.createElement('div');
                        info.className = 'person-card__info';

                        const name = document.createElement('div');
                        name.classList.add('h5', 'person-card__h5');
                        name.textContent = s.name || '';

                        const subline = document.createElement('div');
                        subline.className = 'person-card__job-title';
                        subline.textContent = s.role || s.title || '';

                        info.appendChild(name);
                        info.appendChild(subline);
                        card.appendChild(info);

                        grid.appendChild(card);
                    });

                    evWrap.appendChild(grid);
                }

                dayWrap.appendChild(evWrap);
            });
        });

        wrap.appendChild(dayWrap);

        // Create assistant message container
        const msg = document.createElement('div');
        msg.className = 'message assistant';
        const mid = genId('msg');
        msg.dataset.msgId = mid;
        msg.dataset.raw = (wrap.textContent || wrap.innerText || '').trim();
        msg.dataset.contentType = 'html';
        msg.appendChild(wrap);
        messages.appendChild(msg);

        const row = document.createElement('div');
        row.className = 'msg-actions-row';
        row.dataset.for = mid;
        row.innerHTML = `
            <button class="btn-icon btn-copy" title="Copy" aria-label="Copy" data-msg-id="${mid}">
                <i class="fas fa-copy" aria-hidden="true"></i>
                <span>Copy</span>
            </button>
            <button class="btn-icon btn-share" title="Share" aria-label="Share" data-msg-id="${mid}">
                <i class="fas fa-share-alt" aria-hidden="true"></i>
                <span>Share</span>
            </button>`;
        messages.appendChild(row);

        gsap.from(msg, { y: 10, opacity: 0, duration: 0.18, ease: 'power2.out' });
        setTimeout(() => scrollToBottom(messages), 100);
    } catch (err) {
        console.error('parseJSONSchedule error:', err);
        appendMessage('assistant', { contentType: 'markdown', content: 'Sorry, the schedule could not be loaded.' }, true);
    }

    // ---- Helpers for this payload ----
    function normalizeEvent(s) {
        const type = String(s.category || '').toLowerCase(); // panel, break, innovation case, opening speeches, keynote & closing
        const time = formatTimeRange(s.from, s.to) || (s['speach-time'] || '');
        const panel =
            (s.moderator && s.moderator.panel) ||
            (Array.isArray(s.speakers) && s.speakers[0]?.panel) || '';

        // Speakers + Moderator (if any)
        const speakers = []
            .concat(Array.isArray(s.speakers) ? s.speakers : [])
            .concat(s.moderator ? [{ ...s.moderator, role: s.moderator.role || 'Moderator' }] : []);

        return {
            type,
            title: s.title || '',
            topic: pickTopic(s),
            panel,
            time,
            speakers
        };
    }

    function pickTopic(s) {
        // Prefer session-level title as heading; topic shown only if different or explicit
        // If any speaker has a "speach-topic" and it's different from session title, show the first distinct one
        const t = s.title || '';
        if (!Array.isArray(s.speakers)) return '';
        const found = s.speakers.find(sp => (sp['speach-topic'] || '').trim() && sp['speach-topic'] !== t);
        return found ? found['speach-topic'] : '';
    }

    function normalizeSpeaker(sp) {
        if (!sp || typeof sp !== 'object') return { name: String(sp || '') };
        return {
            id: sp.id || sp.index,
            name: sp.name || '',
            role: sp.role || sp['title-short'] || sp.title || '',
            title: sp['title-short'] || sp.title || '',
            image: sp.image || sp.img || sp.photo || ''
        };
    }

    function formatTimeRange(from, to) {
        const f = (from || '').trim();
        const t = (to || '').trim();
        if (!f && !t) return '';
        if (f && t) return `${f} - ${t}`;
        return f || t;
    }
}


// Unique, non-name-based ID generator for modal cards
function genId(prefix) {
    const p = prefix || 'id';
    const t = Date.now().toString(36);
    const r = Math.random().toString(36).slice(2, 8);
    return `${p}_${t}_${r}`;
}

function startNewSession() {
    messages.innerHTML = '';
    sessionId = "sess_" + Math.random().toString(36).substr(2, 9);
    setSessionId(sessionId);
    ensureStartNewVisibility();
    // Show welcome until the first message is sent
    showWelcomeScreen();
}

function showWelcomeScreen() {
    $("#chat-messages").html($(`
        <div class="welcome-screen" id="welcome-screen">
            <div class="welcome-icon">🤝</div>
            <h4>Welcome to Ask PIDW!</h4>
            <p>Choose a topic to get started:</p>
            <div class="options">
                ${createOptionsButton("Schedule for PIDW25", "Schedule")}
                ${createOptionsButton("Speakers in PIDW25", "Speakers")}
                ${createOptionsButton("Registration for PIDW25", "Registration")}
            </div>
        </div>
    `))
}

function hideWelcomeScreen() {
    $("#welcome-screen").addClass("hidden");
}

function createOptionsButton(message, buttonText) {
    return `
                <div class="btn-no-link-wrap">
                    <div data-icon="ticket" data-hover="" data-message="${message}" data-type="outline-dark" class="btn btn-option">
                        <div class="btn-text__wrap">
                            <div class="btn-text">
                                <p class="btn-text-p">${buttonText}</p>
                            </div>
                            <div class="btn-text is--duplicate">
                                <p class="btn-text-p">${buttonText}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
}

function showLoading() {
    var $loading = $(`
                <div class="message" id="spinnerContainer">
                    <div class="spinner-circle"></div>
                    <div class="spinner-circle"></div>
                    <div class="spinner-circle"></div>
                </div>
            `)
    $("#chat-messages").append($loading);
    $loading.show();
    gsap.fromTo(".spinner-circle",
        { y: 0, scale: 0.5, opacity: 0.3 },
        { y: -10, scale: 1, opacity: 1, stagger: 0.1, repeat: -1, yoyo: true, ease: "power1.inOut" }
    );
}

function hideLoading() {
    gsap.killTweensOf(".spinner-circle");
    $("#chat-messages").find("#spinnerContainer").remove();
}

function scrollToBottom(container) {
    gsap.to(container, {
        scrollTop: container.scrollHeight - container.clientHeight + parseInt(getComputedStyle(container).paddingBottom || 0),
        duration: 0.4,
        ease: "power2.out"
    });
}

document.querySelector(".chat-messages").addEventListener("wheel", e => {
    e.stopPropagation(); // prevent Lenis from hijacking
}, { passive: false });

// ---- Copy/Share helpers ----
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch (_) { /* fallback below */ }
    // Fallback: temporary textarea
    try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
    } catch (_) {
        return false;
    }
}

function flashButton(btn, okText = 'Done', iconClass = 'fa-check') {
    if (!btn) return;
    const icon = btn.querySelector('i');
    const label = btn.querySelector('span');
    const prevIcon = icon ? icon.className : '';
    const prevText = label ? label.textContent : '';
    if (icon) icon.className = `fas ${iconClass}`;
    if (label) label.textContent = okText;
    btn.disabled = true;
    setTimeout(() => {
        if (icon) icon.className = prevIcon;
        if (label) label.textContent = prevText;
        btn.disabled = false;
    }, 1400);
}

// Event delegation for action buttons
$(document).on('click', '.btn-copy', async function () {
    const btn = this;
    const id = btn.getAttribute('data-msg-id');
    const msgEl = document.querySelector(`.message.assistant[data-msg-id="${id}"]`);
    if (!msgEl) return;
    // Always copy plain visible text only
    const text = (msgEl.innerText || msgEl.textContent || '').trim();
    const ok = await copyToClipboard(text);
    flashButton(btn, ok ? 'Copied' : 'Failed', ok ? 'fa-check' : 'fa-exclamation');
});

$(document).on('click', '.btn-share', async function (e) {
    const btn = this;
    const id = btn.getAttribute('data-msg-id');
    const msgEl = document.querySelector(`.message.assistant[data-msg-id="${id}"]`);
    if (!msgEl) return;
    const text = (msgEl.innerText || msgEl.textContent || '').trim();
    openShareMenu('Pakistan International Disputes Weekend 2025', text, msgEl, btn);
});

// Simple share using navigator.share with text plus image URLs; clipboard fallback
function openShareMenu(title, content, msgEl, feedbackBtn) {
    try {
        const imgs = Array.from((msgEl || document).querySelectorAll('img'))
            .map(img => {
                try { return new URL(img.getAttribute('src') || '', location.href).href; } catch { return null; }
            })
            .filter(Boolean);
        let shareText = content || '';
        if (imgs.length) {
            const unique = Array.from(new Set(imgs)).slice(0, 10);
            shareText += `\n\nImages:\n${unique.join('\n')}`;
        }
        shareText += `\n\n${location.href}`;

        if (navigator.share) {
            navigator.share({ title, text: shareText })
                .then(() => { if (feedbackBtn) flashButton(feedbackBtn, 'Shared', 'fa-check'); })
                .catch((err) => {
                    // If user cancels, do nothing; for other errors, show fallback popover
                    if (err && err.name === 'AbortError') {
                        if (feedbackBtn) flashButton(feedbackBtn, 'Canceled', 'fa-ban');
                    } else {
                        showSharePopover(feedbackBtn, title, shareText);
                    }
                });
        } else {
            // Fallback: show custom share popover (WhatsApp, Email, Copy)
            showSharePopover(feedbackBtn, title, shareText);
        }
    } catch (err) {
        console.error('Share failed:', err);
        if (feedbackBtn) flashButton(feedbackBtn, 'Failed', 'fa-exclamation');
    }
}

function showSharePopover(anchorBtn, title, shareText) {
    const row = anchorBtn && anchorBtn.closest ? anchorBtn.closest('.msg-actions-row') : null;
    if (!row) return;
    // Close existing
    document.querySelectorAll('.share-menu').forEach(m => m.remove());

    const encoded = encodeURIComponent(shareText);
    const waHref = `https://wa.me/?text=${encoded}`;
    const mailHref = `mailto:?subject=${encodeURIComponent(title || 'Share')}&body=${encoded}`;

    const menu = document.createElement('div');
    menu.className = 'share-menu';
    menu.innerHTML = `
        <button class="opt opt-wa" data-href="${waHref}"><i class="fab fa-whatsapp"></i><span>WhatsApp</span></button>
        <button class="opt opt-mail" data-href="${mailHref}"><i class="fas fa-envelope"></i><span>Email</span></button>
        <button class="opt opt-copy"><i class="fas fa-copy"></i><span>Copy</span></button>
    `;
    row.appendChild(menu);

    const close = () => {
        menu.remove();
        document.removeEventListener('click', onDoc);
    };
    const onDoc = (e) => {
        if (!menu.contains(e.target) && e.target !== anchorBtn) close();
    };
    setTimeout(() => document.addEventListener('click', onDoc), 0);

    menu.addEventListener('click', async (e) => {
        const opt = e.target.closest('.opt');
        if (!opt) return;
        e.stopPropagation();
        if (opt.classList.contains('opt-copy')) {
            const ok = await copyToClipboard(shareText);
            if (anchorBtn) flashButton(anchorBtn, ok ? 'Copied' : 'Failed', ok ? 'fa-check' : 'fa-exclamation');
            close();
            return;
        }
        const href = opt.getAttribute('data-href');
        if (href) {
            window.open(href, '_blank', 'noopener');
            close();
        }
    });
}

async function sendMessageToOpenAI(message) {
    const res = await fetch("https://ask-pidw.vercel.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message })
    });
    var data = await res.json();

    if (data && data.contentType === "application/json" && data.responseType === "schedule") {
        parseJSONSchedule(data.content);
        return;
    }

    const normalizedReply = normalizeAssistantPayload(data);
    return normalizedReply;
}

// Normalize various backend response shapes into
// { contentType: 'html'|'markdown', content: string, responseType?: string, usedTools?: string[] }
function normalizeAssistantPayload(data) {
    try {
        // If server already returns the structured payload
        if (data && typeof data === 'object' && 'content' in data) {
            return {
                contentType: (data.contentType || 'markdown'),
                content: data.content || '',
                responseType: data.responseType,
                questions: data.questions || null,
            };
        }

        if (data.match(/```json([\s\S]*?)```/)) {
            const json = data.match(/```json([\s\S]*?)```/)[1];
            return { contentType: data.contentType || 'application/json', content: json.trim(), responseType: data.responseType || 'json' };
        }

        // Raw string
        if (typeof data === 'string') {
            try {
                const parsed = JSON.parse(data);
                if (parsed && parsed.content.message) {
                    return { contentType: 'markdown', content: parsed.content.message };
                } else {
                    return { contentType: 'markdown', content: data };
                }
            } catch {
                return { contentType: 'markdown', content: data };
            }
        }
    } catch (_) { /* fall through to default */ }

    // Fallback
    return { contentType: 'markdown', content: '' };
}

// ---------- Session helpers ----------
function loadSessionId() {
    try { return sessionStorage.getItem(STORAGE_KEY); } catch { return null; }
}
function setSessionId(id) {
    try { sessionStorage.setItem(STORAGE_KEY, id); } catch { }
}
function clearSessionId() {
    try { sessionStorage.removeItem(STORAGE_KEY); } catch { }
}

function ensureStartNewVisibility() {
    if (sessionId) $("#start-new-chat").removeClass('hidden');
    else $("#start-new-chat").addClass('hidden');
}

async function loadMessagesOnce(data) {
    $("#chat-messages").html('');
    if (data) {
        data.forEach(m => {
            if (m.role && m.content) if (m.role === 'assistant' || m.role === 'system') {
                try {
                    if (m.contentType === "application/json" && m.responseType === "schedule") {
                        parseJSONSchedule(JSON.parse(m.content));
                        return;
                    }
                    appendMessage(m.role, JSON.parse(m.content), false);
                } catch { appendMessage(m.role, m.content, false); }
            } else appendMessage(m.role, m.content, false);
        });
        setTimeout(() => scrollToBottom(messages), 50);
    } else {
        showWelcomeScreen();
    }
}

async function hasMessages(id) {
    const res = await fetch("https://ask-pidw.vercel.app/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId })
    });
    var messages = await res.json();
    history = messages.data;
    return history;
}

async function initializeChat() {
    $(document).on("click", '[data-modal-card-click]', function () {
        var clickedCard = $(this);
        var clickedCardId = $(this).data('modal-card-id');
        if (clickedCard.attr('data-modal-card-status') == 'active') {
            // If active > Do nothing
        } else {
            $('.modal-container[data-modal-status]').attr('data-modal-status', 'active');
            $('[data-modal-card-id]').attr('data-modal-card-status', 'not-active');
            $('[data-modal-card-id="' + clickedCardId + '"]').attr('data-modal-card-status', 'active');
            lenis.stop();
        }
    });

    // Open Tickets Modal
    $(document).on("click", '[data-modal-tickets="open"]', function () {
        $('.floating-elements .modal-container[data-modal-status]').attr('data-modal-status', 'active');
        $('[data-modal-card-id]').attr('data-modal-card-status', 'not-active');
        $('[data-modal-card-id="tickets"]').attr('data-modal-card-status', 'active')
        //Send an event (Add to cart) to the DataLayer
        // dataLayer.push({'event': 'add_to_cart'});
        lenis.stop();
    });

    // Close Modal
    $(document).on("click", '[data-modal-toggle="close"]', function () {
        $('[data-modal-status]').attr('data-modal-status', 'not-active');
        $('[data-modal-card-id]').attr('data-modal-card-status', 'not-active');
        lenis.start();
    });

    messages = document.getElementById('chat-messages');
    chatInput = document.getElementById('chat-input');

    // Auto-open only if a session exists AND has at least one message in Firebase
    $(document).on("click", "#chat-icon", function () {
        openChatPopup();
    });

    $(document).on("click", "#minimize-chat", function () {
        hideChatPopup();
    });

    $(document).on("click", "#close-chat", function () {
        if (sessionId)
            showConfirmBox();
        else
            hideChatPopup();
    });

    $(document).on("click", "#cancel-close", function () {
        closeConfirmBox();
    });

    $(document).on("click", "#confirm-close", function () {
        hideChatPopup();
        clearSessionId();
    });


    $("#send-btn").on("click", function () {
        sendMessage();
    });

    $("#chat-input").on("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }

        // enter new row if shift + enter
        if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            $(this).val($(this).val() + "\n");
        }
    });

    $(document).on("keydown", function (e) {
        if (e.key === "Escape" && !$("#chat-popup").hasClass("hidden")) {
            hideChatPopup();
        }
    });

    $(document).on("focus", ".chat", function () {
        $(".textarea-wrapper").css("border-color", "var(--color-primary)");
    });

    $(document).on("blur", ".chat", function () {
        $(".textarea-wrapper").css("border-color", "var(--color-border-light)");
    });

    // Key ESC - Close Navigation
    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            $('[data-modal-status]').attr('data-modal-status', 'not-active');
            $('[data-modal-card-id]').attr('data-modal-card-status', 'not-active');
            lenis.start();
        }
    });

    $(document).on("click", ".btn-option", function (e) {
        e.preventDefault();
        var text = $(this).data("message");
        sendMessage(text);
    });

    // Floating button handler
    $(document).on('click', "#start-new-chat", function () {
        startNewSession();
    });


    sessionId = loadSessionId();
    if (sessionId) {
        try {
            const has = await hasMessages(sessionId);
            if (has) openChatPopup();
        } catch (e) {
            console.error('Error checking existing messages:', e);
        }
    }
}
