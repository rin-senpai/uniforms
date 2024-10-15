import { Button } from "./ui/button";

const Settings = () => {
    return (
        <div class="flex flex-row">
            <div class="flex flex-col">
                <div class="flex-col">
                    <div class="m-4">
                        <Button class="w-full">Account</Button>
                    </div>
                    <div class="m-4">
                        <Button class="w-full">Form AutoFill</Button>
                    </div>
                    <div class="m-4">
                        <Button class="w-full">Notification Triggers</Button>
                    </div>
                    <div class="m-4">
                        <Button class="w-full">Delete Account</Button>
                    </div>
                </div>
                <div class="m-4">
                        <Button class="w-full">Log out</Button>
                </div>
            </div>
            <div>
                <div class="flex flex-col w-64">
                    <p class="p-4 bg-gray-100 m-4">Email</p>
                    <p class="p-4 bg-gray-100 m-4">Username</p>
                    <p class="p-4 bg-gray-100 m-4">Password</p>
                </div>
            </div>
        </div>
        
    )
};

export default Settings;
