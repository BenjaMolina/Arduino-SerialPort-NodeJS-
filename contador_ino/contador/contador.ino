
int randNumber;

void setup() {
  Serial.begin(9600);
  
}

void loop() {
 // Numero random de 1 to 300
  randNumber = random(300 + 1);
  Serial.println(randNumber, DEC);
  delay(2000);
}
