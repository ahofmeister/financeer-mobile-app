import supabase from "supabase";
import {useEffect, useState} from "react";

const useCurrentUser = () => {

    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        supabase.auth.getUser().then(response => setCurrentUser(response.data.user))
    }, [])

    return currentUser
}

export default useCurrentUser