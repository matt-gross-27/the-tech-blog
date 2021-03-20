USE the_tech_blog_db;

INSERT INTO user (username, email, password, created_at, updated_at)
VALUES
("tom", "tom@aol.com", "secretPassword", NOW(), NOW()),
("dick", "dick@aol.com", "secretPassword", NOW(), NOW()),
("harry", "harry@aol.com", "secretPassword", NOW(), NOW())
;