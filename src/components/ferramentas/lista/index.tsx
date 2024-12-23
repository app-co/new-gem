import React from 'react';
import { FlatList } from "native-base";
import { RefreshControl } from "react-native";

interface I {
  data: any[]
  renderItem: (item: any) => React.ReactNode
  refleshing: boolean
  onReflesh: () => void
  nextPage?: () => void
}

export function Lista({ data, nextPage, onReflesh, refleshing, renderItem }: I) {
  return (
    <FlatList
      data={data}
      contentContainerStyle={{ gap: 15, paddingBottom: 100 }}
      onEndReached={nextPage}
      refreshControl={
        <RefreshControl refreshing={refleshing} onRefresh={onReflesh} />
      }
      renderItem={({ item }) => (
        <>
          {renderItem(item)}
        </>
      )}
    />
  )
}