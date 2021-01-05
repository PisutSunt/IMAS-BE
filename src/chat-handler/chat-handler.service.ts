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
        // Specify server properties
        const { Kafka } = require('kafkajs')
        const kafka = new Kafka({
            clientId: 'chat-queue',
            brokers: ['localhost:9092']
        })

        // Specify incoming message size
        const AVG_MESSAGE_SIZE = 25 // bytes
        const NUMBER_OF_MESSAGES_TO_RECEIVE = 1
        const MAX_BYTES_PER_PARTITION = NUMBER_OF_MESSAGES_TO_RECEIVE * AVG_MESSAGE_SIZE
        const MAX_BYTES = 32 * MAX_BYTES_PER_PARTITION

        // Specify consumer's properties
        this.pat_chat_handler = kafka.consumer({
            groupId: 'patient-chat-handler-group',
            maxBytesPerPartition: MAX_BYTES_PER_PARTITION,
            maxBytes: MAX_BYTES
        })
        this.doc_chat_handler = kafka.consumer({
            groupId: 'doctor-chat-handler-group',
            maxBytesPerPartition: MAX_BYTES_PER_PARTITION,
            maxBytes: MAX_BYTES
        })

        // Conect the consumer to Kafka server
        this.pat_chat_handler.connect();
        this.doc_chat_handler.connect();

        // Subscribe topic
        this.pat_chat_handler.subscribe({topic: 'patient-chat-queue'});
        this.doc_chat_handler.subscribe({topic: 'doctor-chat-queue'});

        // Run patient chat queue handler Kafka consumer
        this.pat_chat_handler.run({ eachBatch: async ({ batch }) => {
            console.log("incoming patient req");
            this.pat_chat_handler.pause([{topic: 'patient-chat-queue'}]);
            this.patientInfo = batch.messages[0].value.toString();
            this.createChat();
        }});

        // Run doctor chat queue handler Kafka consumer
        this.doc_chat_handler.run({ eachBatch: async ({ batch }) => {
            console.log("incoming doctor req");
            this.doc_chat_handler.pause([{topic: 'doctor-chat-queue'}]);
            this.doctorInfo = batch.messages[0].value.toString();
            this.createChat();
        }});

    }

    // Metod for chat creation
    createChat(){

        if(this.patientInfo != null) console.log(this.patientInfo)
        else console.log('patient info is null')
        
        if(this.doctorInfo != null) console.log(this.doctorInfo)
        else console.log('doctor info is null')

        // Match patient and doctor, then create an event to bus
        if(this.patientInfo != null && this.doctorInfo != null){
            console.log("create chat")
            let payload = { transaction: 'noti-doc-to-accept',
                            payload: {
                                patientInfo: this.patientInfo,
                                doctorInfo: this.doctorInfo
                            }
                        }

            this.event_bus.emit('notification-manager', payload);

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
