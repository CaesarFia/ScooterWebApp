-- Custom SQL migration file to add a default admin user ! --
INSERT INTO users (id, firstname, lastname, email, password_hash) 
VALUES ('ukeku7fowg6n36um', 'Admin', 'User', 'vroom@gmail.com', '$argon2id$v=19$m=19456,t=2,p=1$aexKcHGhPoSbqX2V7WsFqQ$d7b+WqPVATcianB+u/ywXeWUmHIIWzzGWizP4/LqehI');

INSERT INTO employees (id, is_admin) 
VALUES ((SELECT id from users WHERE email='vroom@gmail.com') , 'true');