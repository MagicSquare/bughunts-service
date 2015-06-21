import org.antlr.v4.runtime.*;
import java.math.BigDecimal;


public class BugHuntsDemo {
	
    public static void moveForward(Object param) {
    	if (param == null) {
	   	System.out.println("LadyBug moves forward (default)");    	
    	} else {
    		int dep = new BigDecimal(((CommonToken)param).getText()).intValue();
	   	System.out.println("LadyBug moves forward " + dep);    	
    	}
    }	

    public static void moveBackward(Object param) {
    	if (param == null) {
	   	System.out.println("LadyBug moves backward (default)");    	
    	} else {
    		int dep = new BigDecimal(((CommonToken)param).getText()).intValue();
	   	System.out.println("LadyBug moves backward " + dep);    	
    	}
    }	

    public static void turnLeft(Object param) {
    	if (param == null) {
	   	System.out.println("LadyBug turns left (default)");    	
    	} else {
    		int dep = new BigDecimal(((CommonToken)param).getText()).intValue();
	   	System.out.println("LadyBug turns left " + dep);    	
    	}
    }	

    public static void turnRight(Object param) {
    	if (param == null) {
	   	System.out.println("LadyBug turns right (default)");    	
    	} else {
    		int dep = new BigDecimal(((CommonToken)param).getText()).intValue();
	   	System.out.println("LadyBug turns right " + dep);    	
    	}
    }	

	
    public static void main(String[] args) throws Exception {
    	
        CharStream in = new ANTLRInputStream(args[0]);
        BugHuntsLexer lexer = new BugHuntsLexer(in);
        CommonTokenStream tokens = new CommonTokenStream(lexer);
        BugHuntsParser parser = new BugHuntsParser(tokens);
	parser.items();
    }
}