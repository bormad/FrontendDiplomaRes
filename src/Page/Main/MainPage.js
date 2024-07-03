import styles from './MainPage.module.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slices/postsSlice';
import { Post } from '../../components';

export const MainPage = () => {
	const dispatch = useDispatch();
	const postData = useSelector((state) => state.postsSlice.data);

	React.useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);
	return (
		<div className={styles.wrapper}>
			{Array.isArray(postData) &&
				postData.map(({ title, image, price, id }) => (
					<Post title={title} image={image} price={price} id={id} />
				))}
		</div>
	);
};
