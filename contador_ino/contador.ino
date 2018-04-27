int contador = 0;

void setup() {
  Serial.begin(9600);
  
}

void loop() {
 contador++;
  
 Serial.print(contador,DEC);
 delay(2000);
}
