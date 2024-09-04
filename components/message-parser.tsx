'use client';

import axios from 'axios';
import { usePathname } from 'next/navigation';
import React from 'react';

const MessageParser = ({ children, actions }: any) => {
    const pathName = usePathname();

    const getParamsFromURI = () => {
        const prams = pathName.split('/');
        return prams;
    };

    const checkPage = (namePage: string) => {
        if (getParamsFromURI().includes(namePage)) return true;
        return false;
    };

    if (checkPage('courses')) {
        axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${getParamsFromURI()[2]}/chapters/${getParamsFromURI()[4]}`)
            .then((res) => {
                const data = {
                    videoUrl: res.data.videoUrl,
                    courseId: getParamsFromURI()[2]
                }
                console.log(data);
                //call api here
            })
    }

    const parse = (message: string) => {
        if (message.includes('hello')) {
            console.log(message);
            actions.handleHello();
        }
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions: {},
                });
            })}
        </div>
    );
};

export default MessageParser;