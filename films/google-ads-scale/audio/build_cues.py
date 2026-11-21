import json

scenes = [
    {
        'id': 'scene1',
        'start': 0.0,
        'end': 11.08,
        'phrases': [
            'Agar aapka business scale nahi ho raha,',
            'Toh reason bilkul simple hai:',
            'Social media par log timepass scroll karte hain,',
            'Unka khareedne ka intent ZERO hota hai!'
        ]
    },
    {
        'id': 'scene2',
        'start': 11.38,
        'end': 23.18,
        'phrases': [
            'Yahan game badalta hai Google Ads!',
            'Google par roz 850 CRORE searches hoti hain,',
            'Jahan log wallet haath me lekar',
            'Direct solution aur products dhoondhte hain!'
        ]
    },
    {
        'id': 'scene3',
        'start': 23.48,
        'end': 35.63,
        'phrases': [
            'Google Ads ka 3-Way Scaling Ecosystem dekho:',
            'Search Ads se High-Intent Buyers,',
            'YouTube Ads se Brand Trust,',
            'Aur Performance Max se 90% internet reach!'
        ]
    },
    {
        'id': 'scene4',
        'start': 35.93,
        'end': 48.50,
        'phrases': [
            'Sabse bada benefit: Pay-Per-Click!',
            'Jab tak serious customer click na kare, ZERO COST!',
            'Aur Smart Bidding AI automatic',
            'Lowest cost par maximum sales laata hai!'
        ]
    },
    {
        'id': 'scene5',
        'start': 48.80,
        'end': 59.11,
        'phrases': [
            'Aapke competitors already customers le rahe hain.',
            'Stop waiting, start scaling!',
            'Comment karo GOOGLE,',
            'Free 7-Day Scaling Blueprint ke liye!'
        ]
    }
]

chunked_cues = []
for sc in scenes:
    phrases = sc['phrases']
    total_words = sum(len(p.split()) for p in phrases)
    sc_start = sc['start']
    sc_dur = sc['end'] - sc['start']
    
    cur_t = sc_start
    for p in phrases:
        p_words = len(p.split())
        p_dur = (p_words / total_words) * sc_dur
        chunked_cues.append({
            'scene_id': sc['id'],
            'text': p,
            'start': round(cur_t, 2),
            'end': round(cur_t + p_dur, 2)
        })
        cur_t += p_dur

with open('films/google-ads-scale/audio/word_cues.json', 'w', encoding='utf-8') as f:
    json.dump(chunked_cues, f, indent=2, ensure_ascii=False)

print('Word cues updated.')
