import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  task: {
    position: 'relative',
    color: '#2e2e2f',
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 'auto',
    marginTop: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 30,
    shadowColor: 'rgba(99, 99, 99, 0.1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: 'transparent',
    maxWidth: 300,
  },
  taskHover: {
    shadowColor: 'rgba(99, 99, 99, 0.3)',
    shadowOpacity: 0.3,
    borderColor: 'rgba(162, 179, 207, 0.2)',
  },
  taskText: {
    fontSize: 15,
    marginVertical: 12,
  },
  tag: {
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 13,
    fontSize: 12,
    color: '#ffffff',
    backgroundColor: '#1389eb',
  },
  tags: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  options: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: '#c4cad3',
    fontSize: 17,
  },
  optionsIcon: {
    fill: '#9fa4aa',
    width: 20,
  },
  stats: {
    position: 'relative',
    width: '100%',
    color: '#9fa4aa',
    fontSize: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsItem: {
    marginRight: 10,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  statsIcon: {
    marginRight: 5,
    height: '100%',
    stroke: '#9fa4aa',
  },
  viewer: {
    height: 30,
    width: 30,
    backgroundColor: 'rgb(28, 117, 219)',
    marginRight: -10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#fff',
    padding: 2,
  },
  viewerIcon: {
    stroke: '#fff',
  },
  viewerImage: {
    width: 40,
    height: 40
  }
});

export default styles;
