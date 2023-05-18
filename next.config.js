/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: []
    },
    webpack: (config, { isServer }) => {
        // Chỉ thực hiện cấu hình cho môi trường client-side rendering (CSR)
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                module: false,
                os: false,
                path: false,
                stream: false,
            };
        }

        return config;
    },
}

module.exports = nextConfig