# Fix Auth Persistence on Refresh

## Status: In Progress

### Backend Fixes
- [x] 1. Fix AuthMiddleware.js typo: req.Cookies → req.cookies
- [x] 2. Add cookie-parser to backend/app.js
- [ ] 3. Restart backend server (`cd backend && npm start`)
- [ ] 4. Test: Login → refresh → should stay on Home

### Frontend Improvements
- [ ] 5. Add localStorage token handling in AuthApi + interceptors
- [ ] 6. Update useAuth.js to store token on login/register
- [ ] 7. Update logout to clear localStorage
- [ ] 8. Test full flow

### Completion
- [ ] Remove TODO.md
