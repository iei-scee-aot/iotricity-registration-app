declare global {
    interface TeamMember {
        _id: string;
        name: string;
        googleEmail: string;
        googleProfilePicture: string;
        collegeEmail: string;
        rollNumber: string;
        semester: number;
        department: string;
        phoneNumber: string;
        teamBuildingProgram: boolean;
        readCodeOfConduct: boolean;
        joinedDiscord: boolean;
    }

    interface Team {
        teamName: string;
        teamSecret: string;
        registrationStatus: "UNREGISTERED" | "REGISTERED" | "PAID" | "VERIFIED";
        teamLeader: TeamMember;
        teamMembers: TeamMember[];
        razorpayOrderId?: string;
    }
}

export {}