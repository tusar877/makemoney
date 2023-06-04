import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { GraphQLClient, gql } from 'graphql-request';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const endpoint = "https://ladybabe.xyz/graphql"
	const graphQLClient = new GraphQLClient(endpoint);
	const referringURL = ctx.req.headers?.referer || null;
	const pathArr = ctx.query.postpath as Array<string>;
	const path = pathArr.join('/');
	console.log(path);
	const fbclid = ctx.query.fbclid;

	// redirect if Pinterest is the referer or request contains pinclid
		if (referringURL?.includes('pinterest.com')) {
		  return {
		    redirect: {
		      permanent: false,
		      destination: `${
			`https://amzn.to/42aFW0T`
		      }`,
		    },
		  };
		}

	// redirect if twitter is the referer or request contains twclid
		if (referringURL?.includes('t.co')) {
		  return {
		    redirect: {
		      permanent: false,
		      destination: `${
			`https://amzn.to/42aFW0T`
		      }`,
		    },
		  };
		}
	
	// redirect if YouTube is the referer or request contains ytclid
		if (referringURL?.includes('youtube.com')) {
		  return {
		    redirect: {
		      permanent: false,
		      destination: `${
			`https://amzn.to/42aFW0T`
		      }`,
		    },
		  };
		}

	// redirect if reddit is the referer or request contains tkclid
		if (referringURL?.includes('reddit.com')) {
		  return {
		    redirect: {
		      permanent: false,
		      destination: `${
			`https://amzn.to/42aFW0T`
		      }`,
		    },
		  };
		}

	
	// redirect if Instagram is the referer or request contains igclid
		if (referringURL?.includes('instagram.com')) {
		  return {
		    redirect: {
		      permanent: false,
		      destination: `${
			`https://amzn.to/42aFW0T`
		      }`,
		    },
		  };
		}

	// redirect if TikTok is the referer or request contains tkclid
		if (referringURL?.includes('tiktok.com')) {
		  return {
		    redirect: {
		      permanent: false,
		      destination: `${
			`https://amzn.to/42aFW0T`
		      }`,
		    },
		  };
		}

	
	// redirect if facebook is the referer or request contains fbclid
		if (referringURL?.includes('facebook.com')) {

		return {
			redirect: {
				permanent: false,
				destination: `${
					`https://amzn.to/42aFW0T`
				}`,
			},
		};
		}
	const query = gql`
		{
			post(id: "/${path}/", idType: URI) {
				id
				excerpt
				title
				link
				dateGmt
				modifiedGmt
				content
				author {
					node {
						name
					}
				}
				featuredImage {
					node {
						sourceUrl
						altText
					}
				}
			}
		}
	`;

	const data = await graphQLClient.request(query);
	if (!data.post) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			path,
			post: data.post,
			host: ctx.req.headers.host,
		},
	};
};

interface PostProps {
	post: any;
	host: string;
	path: string;
}

const Post: React.FC<PostProps> = (props) => {
	const { post, host, path } = props;

	// to remove tags from excerpt
	const removeTags = (str: string) => {
		if (str === null || str === '') return '';
		else str = str.toString();
		return str.replace(/(<([^>]+)>)/gi, '').replace(/\[[^\]]*\]/, '');
	};

	return (
		<>
			<Head>
				<meta property="og:title" content={post.title} />
				<meta property="og:description" content={removeTags(post.excerpt)} />
				<meta property="og:type" content="article" />
				<meta property="og:locale" content="en_US" />
				<meta property="og:site_name" content={host.split('.')[0]} />
				<meta property="article:published_time" content={post.dateGmt} />
				<meta property="article:modified_time" content={post.modifiedGmt} />
				<meta property="og:image" content={post.featuredImage.node.sourceUrl} />
				<meta
					property="og:image:alt"
					content={post.featuredImage.node.altText || post.title}
				/>
				<title>{post.title}</title>
			</Head>
			<div className="post-container">
				<h1>{post.title}</h1>
				<img
					src={post.featuredImage.node.sourceUrl}
					alt={post.featuredImage.node.altText || post.title}
				/>
				<article dangerouslySetInnerHTML={{ __html: post.content }} />
			</div>
		</>
	);
};

export default Post;
