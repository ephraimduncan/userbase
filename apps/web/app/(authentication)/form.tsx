"use client"

import { useRouter } from "next/navigation";

const Form = ({ children, action }: {
    children: React.ReactNode;
    action: string;
}) => {
    const router = useRouter();

    return (
        <form
            action={action}
            method="POST"
            onSubmit={
                async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);

                    const response = await fetch(action, {
                        method: "POST",
                        body: formData,
                        redirect: "manual"
                    });

                    if (response.status === 0) {
                        return router.refresh()
                    }
                }
            }
        >
            {children}
        </form>
    )
}

export default Form;