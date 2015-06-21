grammar BugHunts;
items  :
    (ruleFO | ruleBA | ruleRI | ruleLE)*
    ;
ruleFO :
    'FO' param=Number?
    ;
ruleBA :
    'BA' param=Number?
    ;
ruleRI :
    'RI' param=Number?
    ;
ruleLE :
    'LE' param=Number?
    ;
Number
   :    ('0'..'9')+
   ;
WS : [ \t\r\n]+ -> skip ; // skip spaces, tabs, newlines