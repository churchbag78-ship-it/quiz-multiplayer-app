# Invite Friends - Complete Guide 🎮

## How the Invite System Works

Your Quiz Multiplayer app now has a complete invite system for playing with friends!

---

## 🔗 Method 1: Copy Invite Code (Easiest)

### Step 1: Create a Game
1. Log in to the app
2. Choose a quiz and click **"Play Quiz"**
3. You're now in the game lobby

### Step 2: See Your Invite Code
- Your **8-character Game Code** is displayed prominently
- Example: `ABC12345`

### Step 3: Copy & Share
1. Click the **"Copy"** button next to your code
2. Share the copied message with friends
   - Text message: `Join my quiz game! Game Code: ABC12345`
   - Email: Paste the copied text
   - Discord/Slack: Paste in chat

### Step 4: Friend Joins
Your friends see the message and:
1. Open the app
2. Click **"🔗 Join Game with Code"** on the home page
3. Paste the game code: `ABC12345`
4. Click "Join Game"
5. They appear in your lobby! 

---

## 👥 Step-by-Step Example

### You (Host):
```
1. Login to app
2. Select "General Knowledge Quiz"
3. Click "Play Quiz"
4. See lobby with your Game Code: ABC12345
5. Click "Copy" button
6. Share with friends: "ABC12345"
7. Wait for friends to join
8. Click "Start Game" when everyone is ready
```

### Your Friend:
```
1. Login to app
2. Click "Join Game with Code" button
3. Paste code: ABC12345
4. Click "Join Game"
5. Join your lobby and wait for game to start
6. Play together!
```

---

## 🎯 Game Flow

```
Host                          Friend
│                             │
├─ Login                       ├─ Login
├─ Select Quiz                 │
├─ Play Quiz                   │
├─ See Lobby & Code            │
│   (ABC12345)                 │
│                              ├─ Click "Join Game"
│                              ├─ Enter code
│                              │
├─ Friend joins (live!)        ├─ Joined! ✓
├─ See friend in lobby         ├─ See host & players
├─ Click "Start Game"          │
│                              │
├─ Question 1 appears          ├─ Question 1 appears
├─ Both answer                 ├─ Both answer
├─ Scores update live          ├─ Scores update live
│   (Real-time!)               │   (Real-time!)
│                              │
├─ Finish quiz                 ├─ Finish quiz
├─ See leaderboard             ├─ See leaderboard
│   Host: 100 pts              │   Host: 100 pts
│   Friend: 80 pts             │   Friend: 80 pts
```

---

## 💡 Key Features

### ✅ Game Codes
- **Unique per game** - Each game session has a unique code
- **Easy to share** - 8 characters, no special characters
- **One-click copy** - Button copies full invite message
- **Works offline** - Friends can write it down, type it later

### ✅ Real-time Gameplay
- When friend joins, you **instantly see them** in the lobby
- Both players see the **same questions**
- Scores update **live** (no page refresh needed)
- Socket.io handles all communication

### ✅ Host Controls
- **Only the host** can start the game
- Other players wait in lobby
- Host can set when to begin
- All players see when game starts

---

## 🎮 Game Code Format

| Character | What it is | Example |
|-----------|-----------|---------|
| Position 1-8 | Session ID (first 8 chars) | `CUID_ABC` |
| Case | Always UPPERCASE | `ABC12345` |
| Length | 8 characters | Exactly 8 |
| Symbols | None | No `-` or `_` displayed |

---

## 📝 What Friends See

### Join Game Screen
```
┌─────────────────────────────────┐
│     Join Game                   │
│                                 │
│ Enter the game code your friend │
│ shared with you                 │
│                                 │
│ Game Code: [ABC12345____]       │
│                                 │
│ Example: ABC123                 │
│                                 │
│ [  Join Game  ]                 │
│ [   Back      ]                 │
│                                 │
│ How to join:                    │
│ 1. Ask friend for game code     │
│ 2. Paste the code here          │
│ 3. Click "Join Game"            │
│ 4. Wait for host to start       │
└─────────────────────────────────┘
```

### You See (Game Lobby)
```
┌──────────────────────────────────────┐
│ General Knowledge Quiz               │
│ Test your knowledge of geography... │
│                                      │
│ 🎮 Invite Friends                    │
│ ┌─────────────────────────────────┐ │
│ │ Your Game Code:                 │ │
│ │ ABC12345        [Copy] ✓ Copied!│ │
│ │                                 │ │
│ │ 📱 Share this code with friends.│ │
│ │ They can paste it to join you!  │ │
│ └─────────────────────────────────┘ │
│                                      │
│ Players (2)                          │
│ ┌────────────────────────────────┐  │
│ │ • You                       [You] │ │
│ │ • Friend123                     │ │
│ └────────────────────────────────┘  │
│                                      │
│ [▶️ Start Game]                      │
└──────────────────────────────────────┘
```

---

## 🚨 Troubleshooting

### "Game code not found"
- ✅ Make sure the code is typed correctly
- ✅ Check for extra spaces
- ✅ Make sure your friend still has the game open
- ✅ The game must be in "waiting" status (not started)

### Friend can't see my code
- ✅ Make sure you both logged in
- ✅ You're in the game lobby (not on home page)
- ✅ Check that Socket.io connected properly
- ✅ Refresh the page if stuck

### Friend joined but I don't see them
- ✅ They appear in real-time via Socket.io
- ✅ If they don't appear, both refresh
- ✅ Check browser console for errors

### "You have already joined this game"
- ✅ You're already in this game
- ✅ Use the back button to rejoin
- ✅ Try joining a different game

---

## 🎯 Tips for Best Experience

1. **Share quickly** - Copy the code immediately after creating the game
2. **Double-check code** - Make sure friends type it correctly
3. **Stay in lobby** - Don't close the app before starting
4. **Good connection** - Multiplayer works best with stable internet
5. **Same quiz** - Everyone plays the same questions
6. **No cheating** - Questions are hidden until time to answer

---

## 🔐 Security Notes

- Game codes are **unique per session**
- Codes **only work while game is active**
- Only **code + login** needed (no extra auth)
- Codes are **not user-to-user** (session-based)
- Anyone with code can join (public by default)

---

## 📱 Mobile/Multi-Device

The invite system works on:
- ✅ Desktop browsers
- ✅ Mobile browsers (responsive design)
- ✅ Tablets
- ✅ Different devices (friend on phone, you on computer)
- ✅ Different networks (WiFi, cellular, tethering)

---

## 🚀 What Happens Behind the Scenes

1. **Create Game** → Server creates session with unique ID
2. **Display Code** → Frontend shows first 8 chars in uppercase
3. **Copy Code** → JavaScript copies to clipboard
4. **Join Game** → Friend posts code to API
5. **Server Validates** → Checks session exists and is "waiting"
6. **Add to Participants** → Friend's user is added to game
7. **Socket.io Update** → Host sees new player instantly
8. **Start Game** → Host can now begin
9. **Real-time Sync** → All players see same questions/answers

---

## 🎮 Ready to Play!

**Your app now supports:**
- ✅ Creating games
- ✅ Inviting friends by code
- ✅ Real-time multiplayer
- ✅ Live scoring
- ✅ Final leaderboards

**Go ahead and test it!**

1. Create a game and see your invite code
2. Copy it
3. Open a second browser/window
4. Login as a different user
5. Join with the code
6. Start playing together!

---

## 📞 Need Help?

- Check the "How to join:" section in the app
- Make sure both players are logged in
- Check browser console (F12) for errors
- Verify backend is running on port 5000
- Check frontend is running on port 5173

Happy gaming! 🎉