import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { List } from 'src/app/models/List';
import { ApiService } from 'src/app/services/api.service';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  lists: List[] = <List[]>([]);

  constructor(
    private http: HttpClient,
    private msalService: MsalService,
    private apiService: ApiService){ 
      this.loadTable();
      this.getUserClaims();
     }

  getUserClaims() {
    const accounts = this.msalService.instance.getAllAccounts(); // Get all accounts

    if (accounts.length > 0) {
        const account = accounts[0]; // Assuming the first account is the one we want
        console.log('User Claims:', account);
        // Access specific claims like:
        console.log('Email:', account.idTokenClaims?.['email']);
        console.log('Display Name:', account.idTokenClaims?.['name']);
        // Add any other claims you need
    } else {
        console.log('User is not signed in.');
    }
  }

  // This code doenst work
  // TO ACHIEVE THIS, I NEED A BACKEND TO ACT AS A MIDDLEMAN TO REQUEST USER DATA TO THE GRAPH API
  getUserProfile() {
    const tokenRequest = {
        scopes: ['https://graph.microsoft.com/User.Read.All'], // The scopes you requested during login
    };

    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
        // User is signed in, try to acquire token silently
        this.msalService.acquireTokenSilent(tokenRequest).subscribe({
            next: (result) => {
                const headers = { Authorization: `Bearer ${result.accessToken}` };
                this.http.get('https://graph.microsoft.com/v1.0/me', { headers })
                    .subscribe(userProfile => {
                        console.log('User Profile:', userProfile);
                    }, (httpError) => {
                        console.error('Error fetching user profile:', httpError);
                    });
            },
            error: (error) => {
                console.error('Token acquisition failed:', error);
                if (error.errorMessage.includes('interaction_required')) {
                    // Fallback to interactive login if necessary
                    this.msalService.loginRedirect();
                }
            }
        });
    } else {
        // User is not signed in, initiate login
        this.msalService.loginRedirect();
    } 
 }

  loadTable(){
    this.apiService.getLists().subscribe({
      next: (data) => {
        this.lists = data;
      },
      error: (error) => console.log(error)
    });
  }

  logout(popup?: boolean) {
    if (popup) {
      this.msalService.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else {
      this.msalService.logoutRedirect();
    }
  }
}
