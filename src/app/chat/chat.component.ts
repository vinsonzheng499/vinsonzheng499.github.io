import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatMessages') private messagesContainer!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;
  
  messages: ChatMessage[] = [];
  userInput: string = '';
  isLoading: boolean = false;
  
  ngOnInit() {
    // No initial message - we'll show welcome screen instead
  }
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
  
  useExampleQuery(query: string): void {
    this.userInput = query;
    this.sendMessage();
  }
  
  sendMessage(): void {
    if (!this.userInput.trim()) return;
    
    // Add user message to chat
    this.addUserMessage(this.userInput);
    const query = this.userInput;
    this.userInput = '';
    
    // Show loading state
    this.isLoading = true;
    
    // Simulate API call to backend
    // Will be replaced with actual backend call when ready
    setTimeout(() => {
      this.handleResponse(query);
      this.isLoading = false;
    }, 1500);
    
    // Focus the input field after sending
    setTimeout(() => {
      this.messageInput.nativeElement.focus();
    });
  }
  
  private addUserMessage(content: string): void {
    this.messages.push({
      content,
      sender: 'user',
      timestamp: new Date()
    });
  }
  
  private addBotMessage(content: string): void {
    this.messages.push({
      content: content.replace(/\n/g, '<br>'),
      sender: 'bot',
      timestamp: new Date()
    });
  }
  
  private handleResponse(query: string): void {
    // This is a temporary stub that will be replaced by actual backend API call
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('background') || lowerQuery.includes('about')) {
      this.addBotMessage(`Vinson is a software engineer with expertise in full-stack development. 
      He has experience working with Angular, Java, and cloud technologies like GCP.`);
    } 
    else if (lowerQuery.includes('project') || lowerQuery.includes('work')) {
      this.addBotMessage(`Some of Vinson's notable projects include:
      
1. This personal website with RAG capabilities
2. Other projects that will be included in the knowledge base`);
    }
    else if (lowerQuery.includes('skill') || lowerQuery.includes('technolog')) {
      this.addBotMessage(`Vinson's technical skills include:
      
* Frontend: Angular, React, TypeScript
* Backend: Java, Spring Boot, Node.js
* Cloud: Google Cloud Platform (GCP), Spanner
* AI/ML: RAG applications, vector embeddings with FAISS
* Other: RESTful APIs, Git, CI/CD`);
    }
    else {
      this.addBotMessage(`I don't have specific information about that yet. Once the backend is implemented, I'll be able to provide more detailed answers from Vinson's knowledge base.`);
    }
  }
}
