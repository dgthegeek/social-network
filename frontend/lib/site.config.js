function SiteConfig(arg = false) {
    return process.env.NODE_ENV != "production"
        ? "http://localhost:8000"
        : arg
        ? "http://backend:8000"
        : "http://localhost:8000";
}

export default SiteConfig;
