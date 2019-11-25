create schema project0;
set schema 'project0';

create table userstring(
	user_id serial primary key,
    username text,
    "password" text,
    firstname text,
    lastname text,
    email text
);

create table roles(
	role_id serial primary key,
	role_name text
);

create table user_roles(
	user_id int4 references userstring (user_id),
	role_id int4 references roles (role_id),
	constraint user_roles_PK primary key (user_id, role_id)
);

create table reimbursement(
	reimbursement_id serial primary key,
    author int4 references userstring (user_id),
    amount numeric(8,2),
    date_submitted date,
    date_resolved date,
    description text,
    resolver int4
);

create table status(
	status_id serial primary key,
	status_decision text
);

create table typestring(
	type_id serial primary key,
	type_name text
);

create table user_reimbursement_status(
	user_id int4 references userstring (user_id),
	reimbursement_id int4 references reimbursement (reimbursement_id),
	status_id int4 references status (status_id),
	constraint user_reimbursement_status_PK primary key (user_id, reimbursement_id, status_id)
);

create table user_reimbursement_type(
	user_id int4 references userstring (user_id),
	reimbursement_id int4 references reimbursement (reimbursement_id),
	type_id int4 references typestring (type_id),
	constraint user_reimbursement_type_PK primary key (user_id, reimbursement_id, type_id)
);

insert into userstring(username, "password", firstname, lastname, email)
		values('jbezos1', 'moneytalks$1', 'Jeffrey', 'Bezos', 'jeff.bezos@amazon.net'),
				('msakurai2', 'lorddedede', 'Masahiro', 'Sakurai', 'sakurai.sama@nintendo.net'),
				('tomasperez10', 'password', 'Tomas', 'Perez', 'tomas.perez@revature.net'),
				('bestgrandmaever82', 'password', 'Grandma', 'Perez', 'grandmarocks@revature.net'),
				('justbobby3', 'bob123', 'Bobby', 'Robert', 'bobby.robert@notreal.com');
delete from "user" where user_id in (6,7,8,9,10);

insert into roles(role_name)
		values('Admin'),
				('Finance Manager'),
				('User');
			
insert into user_roles
		values(1,1),
			(2,2),
			(3,3),
			(4,3),
			(5,3);
		
insert into reimbursement(author, amount, date_submitted, date_resolved, description, resolver)
		values( 1, 250.00, '2019-11-24', '2019-11-25', 'Relocation', 1),
				(2, 325.00, '2019-11-24', '2019-11-25', 'No reason, I just want free money', 1),
				(3, 33.45, '2019-11-24', '2019-11-25', 'Office Party', 1),
				(4, 100000.00, '2019-11-24', '2019-11-25', 'Retirement', 1),
				(5, 1.00, '2019-11-24', '2019-11-25', 'Bought water from the vending machine for the boss', 1);

insert into status(status_decision)
		values('Accepted'),
				('Denied'),
				('Pending');
			
insert into user_reimbursement_status
		values(1,1,1),
				(2,2,2),
				(3,3,1),
				(4,4,3),
				(5,5,3);
			
insert into typestring(type_name)
		values('Relocation'),
				('Other'),
				('Office/work related expenses'),
				('Retirement benefits');
	
insert into user_reimbursement_type
		values(1,1,1),
				(2,2,2),
				(3,3,3),
				(4,4,4),
				(5,5,3);
				
select amount, author from reimbursement group by author, amount having amount > 100 order by amount desc limit 25 offset 1;
SELECT * FROM project0.userstring NATURAL JOIN project0.user_roles NATURAL JOIN project0.roles WHERE username = $1 and "password" = $2;
SELECT * FROM project0.userstring NATURAL JOIN project0.user_roles NATURAL JOIN project0.roles ORDER BY user_id;
SELECT * FROM project0.userstring NATURAL JOIN project0.user_roles NATURAL JOIN project0.roles where user_id = $1;
begin;
UPDATE project0.userstring SET username = $1, "password" = $2, firstname = $3, lastname = $4, email = $5 WHERE user_id = $6;
INSERT INTO project0.user_roles values ($3,$4);
commit;
rollback;