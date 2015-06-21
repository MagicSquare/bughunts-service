grammar BugHunts;
items  :
    (ruleFO | ruleBA | ruleRI | ruleLE)*
    ;
ruleFO :
    'FO' param=Number?
    {BugHuntsDemo.moveForward($param);}
    ;
ruleBA :
    'BA' param=Number?
        {BugHuntsDemo.moveBackward($param);}
    ;
ruleRI :
    'RI' param=Number?
        {BugHuntsDemo.turnRight($param);}
    ;
ruleLE :
    'LE' param=Number?
    {BugHuntsDemo.turnLeft($param);}
    ;
Number
   :    ('0'..'9')+
   ;
WS : [ \t\r\n]+ -> skip ; // skip spaces, tabs, newlines