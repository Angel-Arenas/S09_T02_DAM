import { StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Explorar</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f7f7f2',
	},
	title: {
		color: '#202820',
		fontSize: 24,
		fontWeight: '700',
	},
});
