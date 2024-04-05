function errorHandler(error, toast, navigate){
    if (error.response) {
        switch (error.response.status) {
            case 400:
                toast.error(error.response.data.message, {
                    position: 'top-right',
                    progress: undefined,
                    autoClose: 5000,
                    theme: 'colored'
                });
                break;
            case 401:
                toast.error(error.response.data.message, {
                    position: 'top-right',
                    progress: undefined,
                    autoClose: 2500,
                    theme: 'colored'
                });
                setTimeout(() => {
                    navigate('/student/login', { replace: true})
                }, 2000);
                break;
            case 403:
                // forbidden
                toast.error(error.response.data.message, {
                    position: 'top-right',
                    progress: undefined,
                    autoClose: 5000,
                    theme: 'colored'
                });
                break;
            case 404:
                console.log('Not found:', error.response);
                toast.error('404: المورد غير موجود. يُرجى التحقق من الطلب والمحاولة مرة أخرى', {
                    position: 'top-right',
                    progress: undefined,
                    autoClose: 5000,
                    theme: 'colored'
                });
                // Redirect user to a relevant page or display a message
                break;
            case 500:
                toast.error('خطأ داخلي في الخادم، حاول مرة أخرى لاحقاً', {
                    position: 'top-right',
                    progress: undefined,
                    autoClose: 5000,
                    theme: 'colored'
                });
                // console.error('Internal server error:', error.response.data);
                // Inform the user that there was an unexpected error
                break;
            case 503:
                toast.error(error.response.data.message, {
                    position: 'top-right',
                    progress: undefined,
                    autoClose: 5000,
                    theme: 'colored'
                });
                console.error('Service unavailable:', error.response.data);
                // Inform the user that the service is temporarily unavailable
                break;
            default:
                toast.error('حدث خطأ غير متوقع', {
                    position: 'top-right',
                    progress: undefined,
                    autoClose: 5000,
                    theme: 'colored'
                });
                // console.error('Unhandled error:', error.response.data);
        }
    } else if (error.request) {
        // console.error('No response received:', error.request);
        toast.error('لم  يتم تلقي أي رد من السيرفر', {
            position: 'top-right',
            progress: undefined,
            autoClose: 5000,
            theme: 'colored'
        });
    } else {
        toast.error('خطأ في إعداد الطلب', {
            position: 'top-right',
            progress: undefined,
            autoClose: 5000,
            theme: 'colored'
        });
        // console.error('Error setting up the request:', error.message);
    }
    return Promise.reject(error);
}

export default errorHandler
