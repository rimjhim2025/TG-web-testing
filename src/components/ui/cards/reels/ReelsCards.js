"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PLAY_ICON =
    "https://images.tractorgyan.com/uploads/119240/6834ccff0851e-youtubeButtonIcon_small.webp";
const VIEWS_ICON = "https://images.tractorgyan.com/uploads/117331/677cd475d38ef-show-hide-icon_small.webp";

/** 🔁 Base reusable card */
const BaseReelCard = ({ data, isDetail = false, asLink = true }) => {
    const router = useRouter();

    const navigate = () => {
        if (data?.full_url) router.push(data.full_url);
    };

    const containerClasses = `relative rounded-2xl border border-gray-light p-4 ${isDetail ? "min-h-[330px]" : "pb-[15px]"}`;
    const thumbnailWrapperClasses = `bg-gray-lighter w-full rounded-xl md:rounded-2xl overflow-hidden relative cursor-pointer ${isDetail
        ? "md:max-h-[250px] md:min-h-[250px] h-full md:max-w-[200px] mx-auto mb-1 h-full"
        : "max-h-[500px] md:max-h-[400px] mb-2.5 h-full"
        }`;
    const titleClasses = `pt-1.5 font-semibold text-black ${isDetail ? "line-clamp-2" : "block"} md:line-clamp-2 overflow-hidden text-ellipsis`;

    // Generate optimized image URL with WebP format and proper sizing
    const getOptimizedImageUrl = (imagePath, width, height) => {
        if (!imagePath) return '';

        const baseUrl = `https://images.tractorgyan.com/uploads/`;
        const imageId = imagePath.split('/').pop();

        // Use WebP format for better compression
        // Adjust quality based on device pixel ratio
        const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1;
        const quality = dpr > 1 ? 75 : 85; // Higher quality for retina displays

        return `${baseUrl}${imageId}?format=webp&width=${width}&height=${height}&quality=${quality}`;
    };

    // Preload LCP image for better performance
    React.useEffect(() => {
        if (data?.image && typeof document !== 'undefined') {
            const optimizedUrl = getOptimizedImageUrl(data.image, isDetail ? 400 : 800, isDetail ? 500 : 600);

            if (optimizedUrl) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = optimizedUrl;
                link.fetchPriority = 'high';
                document.head.appendChild(link);

                // Clean up on component unmount
                return () => {
                    document.head.removeChild(link);
                };
            }
        }
    }, [data?.image, isDetail]);

    const CardContent = (
        <div className={containerClasses}>
            <div className={thumbnailWrapperClasses} onClick={!asLink ? navigate : undefined}>
                {/* play icon overlay */}
                <Image
                    src={PLAY_ICON}
                    alt="play"
                    height={28}
                    width={44}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-7 w-11 z-10"
                    loading="lazy"
                    fetchPriority="low"
                />
                {/* LCP Image with high priority */}
                <Image
                    src={`https://images.tractorgyan.com/uploads/${data?.image}`}
                    alt={data?.title || "Reel thumbnail"}
                    title={data?.title}
                    height={isDetail ? 250 : 400}
                    width={isDetail ? 200 : 600}
                    priority={true}
                    fetchPriority="high"
                    className="h-full w-full object-cover object-center"
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRh4AAABXRUJQVlA4IBIAAAAwAQCdASoBAAEAAgA0JaQAA3AA/vt0AAA="
                    sizes={isDetail ? "(max-width: 768px) 100vw, 200px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"}
                />
            </div>
            <div className="w-full md:flex-1">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-dark font-medium">{data?.created_at}</span>
                    <div className="flex items-end gap-1">
                        <Image
                            src={VIEWS_ICON}
                            width={24}
                            height={20}
                            alt="views"
                            className="h-5 w-6"
                            loading="lazy"
                            fetchPriority="low"
                        />
                        <span className="text-xs font-semibold text-gray-dark">{data?.total_view}</span>
                    </div>
                </div>
                {asLink ? (
                    <h3 className={`${titleClasses} hover:underline`}>
                        {data?.title}
                    </h3>
                ) : (
                    <h3 onClick={navigate} className={`${titleClasses} cursor-pointer`}>
                        {data?.title}
                    </h3>
                )}
            </div>
        </div>
    );

    if (asLink) {
        return (
            <Link
                href={data?.full_url}
                title={data?.title}
                className="block"
                prefetch={false}
            >
                {CardContent}
            </Link>
        );
    }

    return CardContent;
};

/** 🔹 For Listing Page */
export const TG_ReelsCard = ({ data }) => {
    return <BaseReelCard data={data} isDetail={false} />;
};

/** 🔸 For Detail/Sidebar View */
export const TG_ReelsDetailCard = ({ data }) => {
    return <BaseReelCard data={data} isDetail={true} />;
};