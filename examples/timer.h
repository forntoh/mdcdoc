#ifndef _timer_h_
#define _timer_h_

/**
 * # Description
 * 
 * Simple and easy to use timer library
 *
 * ## Example
 *
 * Hello World example (blinking LED)
 *
 * ```cpp
 * #include <Timer.h>
 *
 * Timer timer(1000);
 *
 * void setup() {
 *   pinMode(LED, OUTPUT);
 * }
 *
 * void loop() {
 *   if (timer.elapsed()) {
 *     digitalWrite(LED, ! digitalRead(LED)); // toggle LED
 *   }
 * }
 * ```
 *
 */
class Timer 
{
public:

    /**
     * ## Type definition
     */

    /**
     * Type of time in miliseconds
     */
    typedef unsigned long time_ms;

    /**
     * ## Constructors
     **/

    /**
     * Create new timer instance with defined interval
     *
     * `Timer mytimer(5000); // New timer for 5 sec.`
     * @param interval interval time (in miliseconds)
     * @param autostop indicate if timer should stop after each elapsed
     */
    Timer(time_ms interval, bool autostop = false);

    /**
    * ## Methods
    **/

    /**
     * Check if set interval elapsed
     * @return `true` if interval epalsed othervise `false`
     */
    bool elapsed();

    /**
     * Restart timer form begining
     */
    void restart();

    /**
     * Restart timer form begining and change interval
     * @param interval interval time (in miliseconds)
     */
    void restart(time_ms interval);

    /**
     * ## Attributes
     */

    /**
     * Timers interval (in miliseconds)
     */
    time_ms interval;

private:
    unsigned long last;
};

#endif 