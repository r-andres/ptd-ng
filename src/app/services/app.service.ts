import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = {
        name: 'user',
        createdAt: '2023-03-02',
        email: 'user@nobody.org'
    };

    constructor(private router: Router, private toastr: ToastrService) {}

    async loginByAuth({email, password}) {
        // empty 
    }

    async registerByAuth({email, password}) {
        // try {
        //     const token = await Gatekeeper.registerByAuth(email, password);
        //     localStorage.setItem('token', token);
        //     await this.getProfile();
        //     this.router.navigate(['/']);
        //     this.toastr.success('Register success');
        // } catch (error) {
        //     this.toastr.error(error.message);
        // }
    }

    async loginByGoogle() {
       
    }

    async registerByGoogle() {
        
    }

    async loginByFacebook() {
        
    }

    async registerByFacebook() {
        
    }

    async getProfile() {
        
    }

    logout() {
        
    }
}
