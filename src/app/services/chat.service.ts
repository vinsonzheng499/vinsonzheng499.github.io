import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface ChatRequest {
  query: string;
}

interface ChatResponse {
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ping(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ping`);
  }

  sendMessage(query: string): Observable<ChatResponse> {
    const request: ChatRequest = { query };
    return this.http.post<ChatResponse>(this.apiUrl, request);
  }
}
