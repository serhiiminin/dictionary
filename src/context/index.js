import React from "react";
import PropTypes from "prop-types";
import { LoadingNamesProvider } from "./loading-names";
import { NotificationsProvider } from "./notifications";
import { TokensProvider } from "./tokens";
import { WordsProvider } from "./words";
import { FoundWordProvider } from "./found-word";
import { EditingWordProvider } from "./editing-word";
import { WordsToLearnProvider } from "./words-to-learn";

const StateProvider = ({ children }) => (
  <TokensProvider>
    <LoadingNamesProvider>
      <NotificationsProvider>
        <EditingWordProvider>
          <FoundWordProvider>
            <WordsProvider>
              <WordsToLearnProvider>{children}</WordsToLearnProvider>
            </WordsProvider>
          </FoundWordProvider>
        </EditingWordProvider>
      </NotificationsProvider>
    </LoadingNamesProvider>
  </TokensProvider>
);

StateProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default StateProvider;
