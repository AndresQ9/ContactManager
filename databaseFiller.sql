-- Insert 5 users
INSERT INTO users (userName, password, createdAt) VALUES
('user1', 'password1', NOW()),
('user2', 'password2', NOW()),
('user3', 'password3', NOW()),
('user4', 'password4', NOW()),
('user5', 'password5', NOW());

-- Insert contacts for user 1
INSERT INTO contacts (email, phone, firstName, lastName, userID) VALUES
('john1@example.com', '123-456-7890', 'John', 'Smith', 1),
('joel1@example.com', '234-567-8901', 'Joel', 'Smith', 1),
('josh1@example.com', '345-678-9012', 'Josh', 'Smith', 1),
('joanna1@example.com', '456-789-0123', 'Joanna', 'Smith', 1),
('jon1@example.com', '567-890-1234', 'Jon', 'Smith', 1);

-- Insert contacts for user 2
INSERT INTO contacts (email, phone, firstName, lastName, userID) VALUES
('john2@example.com', '678-901-2345', 'John', 'Doe', 2),
('joel2@example.com', '789-012-3456', 'Joel', 'Doe', 2),
('josh2@example.com', '890-123-4567', 'Josh', 'Doe', 2),
('joanna2@example.com', '901-234-5678', 'Joanna', 'Doe', 2),
('jon2@example.com', '012-345-6789', 'Jon', 'Doe', 2);

-- Insert contacts for user 3
INSERT INTO contacts (email, phone, firstName, lastName, userID) VALUES
('john3@example.com', '111-222-3333', 'John', 'Brown', 3),
('joel3@example.com', '222-333-4444', 'Joel', 'Brown', 3),
('josh3@example.com', '333-444-5555', 'Josh', 'Brown', 3),
('joanna3@example.com', '444-555-6666', 'Joanna', 'Brown', 3),
('jon3@example.com', '555-666-7777', 'Jon', 'Brown', 3);

-- Insert contacts for user 4
INSERT INTO contacts (email, phone, firstName, lastName, userID) VALUES
('john4@example.com', '888-999-0000', 'John', 'Johnson', 4),
('joel4@example.com', '999-000-1111', 'Joel', 'Johnson', 4),
('josh4@example.com', '000-111-2222', 'Josh', 'Johnson', 4),
('joanna4@example.com', '111-222-3333', 'Joanna', 'Johnson', 4),
('jon4@example.com', '222-333-4444', 'Jon', 'Johnson', 4);

-- Insert contacts for user 5
INSERT INTO contacts (email, phone, firstName, lastName, userID) VALUES
('john5@example.com', '333-444-5555', 'John', 'Davis', 5),
('joel5@example.com', '444-555-6666', 'Joel', 'Davis', 5),
('josh5@example.com', '555-666-7777', 'Josh', 'Davis', 5),
('joanna5@example.com', '666-777-8888', 'Joanna', 'Davis', 5),
('jon5@example.com', '777-888-9999', 'Jon', 'Davis', 5);
