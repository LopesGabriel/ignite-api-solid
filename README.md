# App

Gympass style app.

## FRs (Functional requirements)

- [ ] Should be possible to signup;
- [ ] Should be possible to autenticate;
- [ ] Should be possible to retrieve authenticated user's profile;
- [ ] Should be possible retrieve the amount of user's check-ins;
- [ ] Should be possible to retrieve gyms near user;
- [ ] Should be possible search gym by name;
- [ ] Should be possible to do check-in in a gym;
- [ ] Should be possible to validate user's check-in;
- [ ] Should be possible to create a gym;

## BRs (Business rules)

- [ ] User can't signup with e-mail already used;
- [ ] User can't do check-in twice a day;
- [ ] User can't do check-in 100m far from gym;
- [ ] The check-in can only be validated until 20 minutes after creation;
- [ ] The check-in can only be validated by admins;
- [ ] Gym can only be created by admins

## NFRs (Not functional requirements)

- [ ] Password must be encrypted;
- [ ] Data must be in PostgreSQL;
- [ ] All data lists must be paginates with maximum of 20 items per page;
- [ ] User must be authenticated by JWT token (JSON Web Token);
