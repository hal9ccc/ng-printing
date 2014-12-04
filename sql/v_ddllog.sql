select * from v_ddllog where eventdate > sysdate - 100
AND OPERATION != 'RECOMPILE'
and EVENTUSER != 'SYS'
and lower(osuser) like 'schulze'
order by eventdate desc