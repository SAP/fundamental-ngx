import { Observable } from 'rxjs';
import { User } from './user';

export interface UserDataSource {

    /**
     * Fetch list of users.
     */
    fetch(): Observable<User[]>;

    /**
     * Fetch user details.
     */
    fetchUser(id: string): Observable<User>;

}
