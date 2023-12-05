import {Injectable} from '@angular/core';
import {telegramConfig} from '../../../assets/telegram.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TelegramApiService {
  public config = telegramConfig;
  API = `https://api.telegram.org`;

  constructor( private http: HttpClient ) {}

  onSend(msg: any): any {
    const token = this.config.token;
    const chatID = this.config.chatID;
    let message = '';
    if (msg && msg.name) { message += `<b>Name:</b> ${msg.name} %0A`; }
    if (msg && msg.email) { message += `<b>Email:</b> ${msg.email} %0A`; }
    if (msg && msg.phone) { message += `<b>Contacts Number:</b> ${msg.phone} %0A`; }
    if (msg && msg.propertyType) { message += `<b>Property Type:</b> ${msg.propertyType} %0A`; }
    if (msg && msg.district) { message += `<b>District:</b> ${msg.district} %0A`; }
    if (msg && msg.rooms) { message += `<b>Bedroom:</b> ${msg.rooms} %0A`; }
    if (msg && msg.details) { message += `<b>Details:</b> ${msg.details}`; }
    return this.http.post<any>(`${this.API}/bot${token}/sendMessage?chat_id=${chatID}&parse_mode=html&text=${message}`, 'r');
  }
}
