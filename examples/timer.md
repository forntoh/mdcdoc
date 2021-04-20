# Timer

## Description

Simple and easy to use timer library

### Example

Hello World example (blinking LED)

```cpp
#include <Timer.h>

Timer timer(1000);

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  if (timer.elapsed()) {
    digitalWrite(LED, ! digitalRead(LED)); // toggle LED
  }
}
```


```cpp
class Timer
```


## Type definition

1. ### typedef unsigned long time_ms

    Type of time in miliseconds

    ```cpp
    typedef unsigned long time_ms
    ```


## Constructors

1. ### 💡 Timer(time_ms interval, bool autostop = false)

    Create new timer instance with defined interval
    
    `Timer mytimer(5000); // New timer for 5 sec.`

    ```cpp
    Timer(time_ms interval, bool autostop = false)
    ```

    **Params:**

    - `interval` - interval time (in miliseconds)
    - `autostop` - indicate if timer should stop after each elapsed


## Methods

1. ### Ⓜ️ bool elapsed()

    Check if set interval elapsed

    ```cpp
    bool elapsed()
    ```

    **Returns:**

    - `true` if interval epalsed othervise `false`

1. ### Ⓜ️ void restart()

    Restart timer form begining

    ```cpp
    void restart()
    ```


1. ### Ⓜ️ void restart(time_ms interval)

    Restart timer form begining and change interval

    ```cpp
    void restart(time_ms interval)
    ```

    **Params:**

    - `interval` - interval time (in miliseconds)


## Attributes

1. ### time_ms interval

    Timers interval (in miliseconds)

    ```cpp
    time_ms interval
    ```

