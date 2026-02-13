import Link from 'next/link'
import Image from 'next/image'
export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4 relative">
            <div className="text-center relative z-10">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-orange mb-4">404</h1>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Oops The page you are looking for does not exist. It might have been moved or deleted.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-block bg-orange-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors duration-300"
                    >
                        Back to Homepage
                    </Link>

                    <div className="pt-4">
                        <p className="text-gray-500 text-sm">
                            Need help?
                            <Link
                                href="/contact"
                                className="text-orange-500 hover:text-orange-600 font-medium"
                            >
                                Contact our support team
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className='absolute w-full h-full inset-0'>
                <div className='relative w-full h-full'>
                    <Image fill alt="bg" className="" src={'/assets/images/bg-gradient.png'} />
                </div>
            </div>
        </div>
    )
}