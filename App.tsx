import React from 'react';
import {
  Canvas,
  TextPath,
  Fill,
  matchFont,
  SkPoint,
  usePathValue,
  Path,
} from '@shopify/react-native-skia';
import {Button, Platform, StyleSheet, SafeAreaView} from 'react-native';
import {makeMutable} from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
});

const pointsA: SkPoint[] = [
  {x: 16.27771295215871, y: 40.43173862310385},
  {x: 154.5507584597433, y: 43.93232205367565},
  {x: 158.0574027244251, y: 169.8473390993039},
  {x: 280.5717619603267, y: 171.7036172695449},
];

const pointsB: SkPoint[] = [
  {x: 6.277712952158706, y: 216.26507195643714},
  {x: 154.5507584597433, y: 43.93232205367565},
  {x: 158.0574027244251, y: 169.8473390993039},
  {x: 289.7384286269933, y: 28.370283936211564},
];

const points = pointsA.map(p => ({
  x: makeMutable(p.x),
  y: makeMutable(p.y),
}));

const fontFamily = Platform.select({ios: 'Helvetica', default: 'serif'});
const font = matchFont({
  fontFamily,
  fontSize: 14,
  fontStyle: 'italic',
  fontWeight: 'bold',
});

export default function App() {
  const path = usePathValue(p => {
    'worklet';

    p.moveTo(points[0].x.value, points[0].y.value);
    p.cubicTo(
      points[1].x.value,
      points[1].y.value,
      points[2].x.value,
      points[2].y.value,
      points[3].x.value,
      points[3].y.value,
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Toggle Path Change" onPress={togglePathChange} />
      <Canvas style={styles.canvas}>
        <Fill color="lightgrey" />
        <TextPath
          font={font}
          path={path}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing"
        />
        <Path path={path} style={'stroke'} strokeWidth={2} color={'blue'} />
      </Canvas>
    </SafeAreaView>
  );

  function togglePathChange() {
    console.log(path.value.getPoint(0).x);
    if (Math.round(path.value.getPoint(0).x) === Math.round(pointsA[0].x)) {
      points.forEach((p, i) => {
        p.x.value = pointsB[i].x;
        p.y.value = pointsB[i].y;
      });
    } else {
      points.forEach((p, i) => {
        p.x.value = pointsA[i].x;
        p.y.value = pointsA[i].y;
      });
    }
  }
}
