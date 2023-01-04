import React, {
    createContext, useState, useMemo, useContext,
  } from 'react';
  
  const PlayerContext = createContext();
  
  export function PlayerProvider({ children }) {
    const [player, setPlayer] = useState(null);
  
    const value = useMemo(() => ({
      player,
      setPlayer,
    }), [player]);
  
    return (
      <PlayerContext.Provider value={value}>
        {children}
      </PlayerContext.Provider>
    );
  }
  
  export const usePlayerContext = () => useContext(PlayerContext);
  