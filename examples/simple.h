// simple c header

/**
 * # Calculator functions 
 * 
 * This is simple c header file for fictive calculator
 */

/**
 * ## Functions
 */

/** (add)
 * Add two numbers together
 * 
 * @param a first number
 * @param b second number
 * @return addition of number `a` and `b`
 */
int add(int a, int b);

/** (sub)
 * Substract two numbers
 * 
 * @param a first number
 * @param b second number
 * @return subtraction of number `a` and `b`
 */
int sub(int a, int b);

/** 
 * ## Global variables
 */

/**
 * Global variable that contains last successful result of [add](#add) or [sub](#sub) functions.
 */
extern int ans;
