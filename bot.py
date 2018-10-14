from flask import Flask
app = Flask(__name__)
import serial
ser = serial.Serial('/dev/cu.SLAB_USBtoUART', 9600) # Establish the connection on a specific port

@app.route('/<name>')
def letter_to_motor(name):
    try: 
        letter = name[0]
        pos = (ord(name) % 26)+ 32
        ser.write(str(chr(pos)).encode('utf-8'))
        return ser.readline()
    except Exception as error:
        return str(error)

if __name__ == '__main__':
    app.debug = True
    app.run(host = '0.0.0.0',port=5005)

'''
//Arduino code
#include <Servo.h>
Servo myservo;
int servoPin = D4;
void setup() {
  Serial.begin(9600); // set the baud rate
  Serial.println("Ready"); // print "Ready" once
}
void loop() {
  char inByte = ' ';
  if(Serial.available()){ 
    char inByte = Serial.read() - '0'; 
    int pos = inByte;
    myservo.attach(servoPin);
    myservo.write(pos);
    myservo.detach();
    Serial.println(pos); 
  }
  delay(100); // delay for 1/10 of a second
}
'''
