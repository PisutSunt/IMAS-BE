import { PatientInfo, DoctorInfo } from './chat-handler.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Consumer } from '@nestjs/microservices/external/kafka.interface';
import { Client } from '@nestjs/microservices/external/nats-client.interface';

@Injectable()
export class ChatHandlerService {

    private pat_chat_handler: Consumer;
    private doc_chat_handler: Consumer;

    private patientInfo: any = null;
    private doctorInfo: any = null;

    constructor(@Inject('CHAT_HANDLER') private event_bus: Client) 
    {          
        const { Kafka } = require('kafkajs')
        const kafka = new Kafka({
            clientId: 'chat-queue',
            brokers: ['localhost:9092']
        })

        this.pat_chat_handler = kafka.consumer({groupId: 'patient-chat-handler-group'})
        this.doc_chat_handler = kafka.consumer({groupId: 'doctor-chat-handler-group'})

        this.pat_chat_handler.connect();
        this.doc_chat_handler.connect();


        this.pat_chat_handler.subscribe({topic: 'patient-chat-queue'});
        this.doc_chat_handler.subscribe({topic: 'doctor-chat-queue'});

        this.pat_chat_handler.run({ eachMessage: async ({ topic, message }) => {
            console.log("incoming doctor patient");
            this.pat_chat_handler.pause([{topic: 'patient-chat-queue'}]);
            this.patientInfo = message.value.toString();
            this.createChat();
        }});

        
        this.doc_chat_handler.run({ eachMessage: async ({ topic, message }) => {
            console.log("incoming doctor req");
            this.doc_chat_handler.pause([{topic: 'doctor-chat-queue'}]);
            this.doctorInfo = message.value.toString();
            this.createChat();
        }});

    }

    // async waitDoctorAccept(){
    //     console.log("incoming patient req 2");
    //     await this.pat_chat_handler.run({ eachMessage: async ({ topic, message }) => {
    //         console.log('aaa')
    //         this.pat_chat_handler.pause([{topic: 'patient-chat-queue'}]);
    //         console.log('AAA')
    //         this.patientInfo = message.value.toString();
    //     }});
    // }

    // async waitPatientRequest(){
    //     console.log("incoming doctor req 2");
    //     await this.doc_chat_handler.run({ eachMessage: async ({ topic, message }) => {
    //         this.doc_chat_handler.pause([{topic: 'doctor-chat-queue'}]);
    //         this.doctorInfo = message.value.toString();
    //     }});
    // }

    createChat(){

        if(this.patientInfo != null) console.log(this.patientInfo)
        else console.log('patient info is null')
        
        if(this.doctorInfo != null) console.log(this.doctorInfo)
        else console.log('doctor info is null')

        
        if(this.patientInfo != null && this.doctorInfo != null){
            console.log("create chat")
            let payload = { patientInfo: this.patientInfo,
                            doctorInfo: this.doctorInfo};

            this.event_bus.emit('chat', 'payload');

            this.patientInfo = null;
            this.doctorInfo = null;

            this.pat_chat_handler.resume([{topic: 'patient-chat-queue'}]);
            this.doc_chat_handler.resume([{topic: 'doctor-chat-queue'}]);
        }
        else{
            console.log('wait for matching')
        }
    }
  
}
