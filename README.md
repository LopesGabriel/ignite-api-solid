# App

Gympass style app.

## FRs (Functional requirements)

- [x] Should be possible to signup;
- [x] Should be possible to autenticate;
- [x] Should be possible to retrieve authenticated user's profile;
- [x] Should be possible retrieve the amount of user's check-ins;
- [ ] Should be possible to retrieve gyms near user;
- [x] Should be possible search gym by name;
- [x] Should be possible to do check-in in a gym;
- [ ] Should be possible to validate user's check-in;
- [x] Should be possible to create a gym;

## BRs (Business rules)

- [x] User can't signup with e-mail already used;
- [x] User can't do check-in twice a day;
- [x] User can't do check-in 100m far from gym;
- [ ] The check-in can only be validated until 20 minutes after creation;
- [ ] The check-in can only be validated by admins;
- [ ] Gym can only be created by admins

## NFRs (Not functional requirements)

- [x] Password must be encrypted;
- [x] Data must be in PostgreSQL;
- [x] All data lists must be paginates with maximum of 20 items per page;
- [ ] User must be authenticated by JWT token (JSON Web Token);
