import json

with open('src/locales/en.json', 'r') as f:
    en = json.load(f)

with open('src/locales/hi.json', 'r') as f:
    hi = json.load(f)

# Update Dashboard
dashboard_updates_en = {
    "title": "Dashboard",
    "loading_github": "Loading GitHub Stats...",
    "repos": "Repos",
    "followers": "Followers",
    "stars": "Stars",
    "forks": "Forks",
    "view_github": "View GitHub Profile",
    "error_github": "Could not load GitHub data.",
    "rate_limit": "Rate limit may be exceeded.",
    "view_profile": "View profile",
    "lang_dist": "Language Distribution",
    "loading": "Loading...",
    "error_data": "Could not load data.",
    "global_rank": "Global Rank",
    "accepted_sub": "Accepted Submissions",
    "difficulty": "Difficulty",
    "problems": "Problems",
    "submissions": "Submissions",
    "view_leetcode": "View on LeetCode",
    "error_leetcode": "Could not load LeetCode stats.",
    "api_unavailable": "The API may be temporarily unavailable.",
    "view_directly": "View profile directly"
}
en['dashboard'].update(dashboard_updates_en)

dashboard_updates_hi = {
    "title": "डैशबोर्ड",
    "loading_github": "गिटहब आंकड़े लोड हो रहे हैं...",
    "repos": "रिपोज",
    "followers": "फ़ॉलोअर्स",
    "stars": "स्टार्स",
    "forks": "फोर्क्स",
    "view_github": "गिटहब प्रोफ़ाइल देखें",
    "error_github": "गिटहब डेटा लोड नहीं किया जा सका।",
    "rate_limit": "दर सीमा पार हो सकती है।",
    "view_profile": "प्रोफ़ाइल देखें",
    "lang_dist": "भाषा वितरण",
    "loading": "लोड हो रहा है...",
    "error_data": "डेटा लोड नहीं किया जा सका।",
    "global_rank": "ग्लोबल रैंक",
    "accepted_sub": "स्वीकृत प्रस्तुतियाँ",
    "difficulty": "कठिनाई",
    "problems": "समस्याएँ",
    "submissions": "प्रस्तुतियाँ",
    "view_leetcode": "लीटकोड पर देखें",
    "error_leetcode": "लीटकोड आंकड़े लोड नहीं किए जा सके।",
    "api_unavailable": "API अस्थायी रूप से अनुपलब्ध हो सकता है।",
    "view_directly": "सीधे प्रोफ़ाइल देखें"
}
hi['dashboard'].update(dashboard_updates_hi)

# Update Terminal
terminal_updates_en = {
    "title": "Interactive Terminal",
    "not_found": "bash: {cmd}: command not found. Type 'help' for available commands.",
    "commands": {
        "help": "Available commands: help, about, projects, resume, skills, contact, github, theme, clear, sudo hire piyush",
        "about": "Piyush Jain is a Full-Stack Software Engineer building scalable backend systems and intelligent AI integrations.",
        "projects": "Featured: Curio, Agro AI,  Hostel Leave Management. Type 'github' to see more.",
        "skills": "Languages: Python, JavaScript | Frameworks: React, Node.js, FastAPI | Tools: Docker, AWS, Git",
        "contact": "Email: Piyushjain1857@gmail.com | Phone: +91 8595850153",
        "github": "Redirecting to GitHub...",
        "sudo_hire": "Access Granted. Initializing offer letter protocols... just kidding, please email me at Piyushjain1857@gmail.com!",
        "theme": "Use the theme switcher in the navigation bar to toggle between Dark, Cyberpunk, and Forest themes."
    }
}
en['terminal'].update(terminal_updates_en)

terminal_updates_hi = {
    "title": "इंटरएक्टिव टर्मिनल",
    "not_found": "bash: {cmd}: कमांड नहीं मिला। उपलब्ध कमांड के लिए 'help' टाइप करें।",
    "commands": {
        "help": "उपलब्ध कमांड: help, about, projects, resume, skills, contact, github, theme, clear, sudo hire piyush",
        "about": "पीयूष जैन एक फुल-स्टैक सॉफ्टवेयर इंजीनियर हैं जो स्केलेबल बैकएंड सिस्टम और बुद्धिमान एआई इंटीग्रेशन बनाते हैं।",
        "projects": "प्रमुख: Curio,  Hostel Leave Management। अधिक देखने के लिए 'github' टाइप करें।",
        "skills": "भाषाएं: Python, JavaScript | फ्रेमवर्क: React, Node.js, FastAPI | टूल्स: Docker, AWS, Git",
        "contact": "ईमेल: Piyushjain1857@gmail.com | फ़ोन: +91 8595850153",
        "github": "गिटहब पर रीडायरेक्ट कर रहा है...",
        "sudo_hire": "पहुंच स्वीकृत। प्रस्ताव पत्र प्रोटोकॉल प्रारंभ... मज़ाक कर रहा हूँ, कृपया मुझे Piyushjain1857@gmail.com पर ईमेल करें!",
        "theme": "डार्क, साइबरपंक और फ़ॉरेस्ट थीम के बीच टॉगल करने के लिए नेविगेशन बार में थीम स्विचर का उपयोग करें।"
    }
}
hi['terminal'].update(terminal_updates_hi)

# Update Chatbot
chatbot_updates_en = {
    "title": "AI Assistant",
    "placeholder": "Ask something..."
}
en['chatbot'].update(chatbot_updates_en)

chatbot_updates_hi = {
    "title": "एआई सहायक",
    "placeholder": "कुछ पूछें..."
}
hi['chatbot'].update(chatbot_updates_hi)

with open('src/locales/en.json', 'w') as f:
    json.dump(en, f, indent=2, ensure_ascii=False)

with open('src/locales/hi.json', 'w') as f:
    json.dump(hi, f, indent=2, ensure_ascii=False)
