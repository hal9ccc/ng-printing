select * from v_ddllog where eventdate > sysdate - 100
                             AND OPERATION != 'RECOMPILE'
                             and EVENTUSER = 'SYS'
                             and lower(osuser) like 'schulze'
order by eventdate desc;

select * from dba_jobs;

select * from q;

select * from sessions order by SESSIONID desc;

select * from contexts order by CONTEXTID desc;

create table q2 as select * from objects where rownum < 1000;

select * from q
2;