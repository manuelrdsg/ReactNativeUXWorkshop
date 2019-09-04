import React from "react";
import { StyleSheet, FlatList } from "react-native";

import CollapsibleHeader from "./CollapsibleHeader";
import HeaderTitle from "./HeaderTitle";
import SongItem from "./SongItem";
import Animated from "react-native-reanimated";
import { NAV_BAR_HEIGHT, PLAYER_HEIGHT } from "../utils/constants";

const { event, Value } = Animated;
const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
const scrollY = new Value(0);

const SongList = ({
  songs,
  currentSong,
  onSongPress,
  onSongRemove,
  onFavouriteToggle
}) => {
  const renderRow = item => {
    return (
      <SongItem
        item={item.item}
        onSongRemove={onSongRemove}
        onSongFavouriteToggle={onFavouriteToggle}
        onPress={onSongPress}
      />
    );
  };

  return (
    <React.Fragment>
      <CollapsibleHeader scrollY={scrollY} currentSong={currentSong} />
      <AnimatedFlatlist
        data={songs}
        renderItem={renderRow}
        keyExtractor={item => item.track.id}
        bounces={false}
        contentContainerStyle={styles.listContainer}
        scrollEventThrotle={16}
        onScroll={event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY
              }
            }
          }
        ])}
      />

      {/* We will need it later */}
      <HeaderTitle scrollY={scrollY} currentSong={currentSong}></HeaderTitle>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: NAV_BAR_HEIGHT,
    paddingBottom: PLAYER_HEIGHT
  }
});

export default SongList;
