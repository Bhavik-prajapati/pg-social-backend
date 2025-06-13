create table users(
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password TEXT NOT NULL,
headline TEXT,
bio TEXT,
profile_image TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

INSERT INTO users (name, email, password, headline, bio, profile_image)
VALUES 
  ('Alice Johnson', 'alice@example.com', 'hashed_password_1', 'Software Engineer', 'Passionate about building scalable systems.', 'https://example.com/images/alice.jpg'),
  ('Bob Smith', 'bob@example.com', 'hashed_password_2', 'Product Manager', 'Driven by user experience and impact.', 'https://example.com/images/bob.jpg'),
  ('Charlie Lee', 'charlie@example.com', 'hashed_password_3', 'Data Scientist', 'Loves turning data into decisions.', 'https://example.com/images/charlie.jpg');

select * from users




create table follow_connections(
	id SERIAL PRIMARY KEY,
	follower_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
	following_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE(follower_id,following_id)
);

alice follow bob 1->2
INSERT INTO follow_connections(follower_id,following_id)
VALUES(1,2);
bob follow charlie
INSERT INTO follow_connections(follower_id,following_id)
VALUES(2,1);
INSERT INTO follow_connections(follower_id,following_id)
VALUES(3,1);
select * from follow_connections



select * from follow_connections;

SELECT 
    u.name AS follower
FROM 
    follow_connections fc
JOIN 
    users u ON fc.follower_id = u.id
WHERE 
    fc.following_id = 2;

SELECT 
    u1.name AS follower,
    u2.name AS following
FROM 
    follow_connections fc
JOIN 
    users u1 ON fc.follower_id = u1.id
JOIN 
    users u2 ON fc.following_id = u2.id;





create table posts(
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
	content TEXT NOT NULL,
	image_url TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




INSERT INTO posts (user_id, content)
VALUES 
    (2, 'Excited to join this platform!'),
    (1, 'Just published my first blog post about Node.js and PostgreSQL.');



select * from follow_connections




SELECT u.id, u.name, u.email
FROM follow_connections fc
JOIN users u ON u.id = fc.follower_id
WHERE fc.following_id = 1;




create table comments(
id serial primary key,
post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
content TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
create table likes(
id serial primary key,
post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UNIQUE (post_id,user_id)
);




CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (post_id, user_id)
);



