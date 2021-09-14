/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var min = 0;
var max = 10;
var numA = 0;
var numB = 0;
var record = 0;
var soundOk = "./snd/right.wav";
var soundKo = "./snd/retry.wav";

 
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');        
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// Tabelline Init!
app.initialize();
askNew();

// UI events setup
document.getElementById('answer').addEventListener("keyup", function(event) {
	
  // on Enter, verifies the answer
  if (event.keyCode === 13) {
    event.preventDefault();
    verify();
    
    // Trigger the button element with a click
    document.getElementById("answer").click();
    
  }
});

function verify() {
		answer = parseInt(document.getElementById("answer").value);
		if (answer == numA*numB) {
			celebrate();
			record = record+1;
			recordUpdate();
			askNew();
		} else {
			retry();
			record = 0;
			recordUpdate();
			document.getElementById("answer").focus();
		}
			
}

function recordUpdate() {
	document.getElementById('scorenum').innerHTML = record.toString()
}

function askNew() {
        //randomize operation and prompt for it
        min = 0;
				max = 10;
				
        numA = parseInt(Math.random() * (max + 1 - min) + min);
        numB = parseInt(Math.random() * (max + 1 - min) + min);
        document.getElementById('questnum').innerHTML = numA.toString()+" x "+numB.toString();
        document.getElementById("answer").value = "";     
        document.getElementById("answer").focus();
}

function celebrate() {
			document.getElementById("audio").src = soundOk;
			document.getElementById("audio").play();
}

function retry() {
			document.getElementById("audio").src = soundKo;
			document.getElementById("audio").play();
}
