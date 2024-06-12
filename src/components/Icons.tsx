import { LucideProps, UserPlus } from "lucide-react";


export const Icons = {
    Logo: (props :LucideProps)=>(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-twitter"
            {...props}
        >
            <path d="M23 2L12 14l-3-3" />
        </svg>
    ),
UserPlus

}

export type Icon = keyof typeof Icons;